alter table "public"."impressions" add column "adShown" boolean;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_active_campaigns(_networkid integer)
 RETURNS SETOF campaigns
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT campaigns.*
    FROM campaigns
    WHERE 
        "networkId" = _networkId AND
        start_date <= CURRENT_TIMESTAMP AND
        end_date >= CURRENT_TIMESTAMP AND
        (
            SELECT COALESCE(SUM(impressions.price), 0)
            FROM impressions
            WHERE impressions."campaignId" = campaigns."campaignId"
        ) + campaigns."cpmBid" < campaigns.budget * 1000;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.countadspend(campaignid integer, adid integer, publisherid integer, networkid integer, advertiserid integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    totalSpend INTEGER;
BEGIN
    SELECT COALESCE(SUM(price), 0)
    INTO totalSpend
    FROM impressions
    INNER JOIN campaigns ON impressions."campaignId" = campaigns."campaignId"
    INNER JOIN ads ON campaigns."adId" = ads."adId"
    INNER JOIN networks ON campaigns."networkId" = networks."networkId"
    INNER JOIN advertisers ON campaigns."advertiserId" = advertisers."advertiserId"
    INNER JOIN publishers ON networks."publisherId" = publishers."publisherId"
    WHERE 
        (campaignId IS NULL OR campaignId = campaigns."campaignId") AND
        (adId IS NULL OR adId = ads."adId") AND
        (publisherId IS NULL OR publisherId = publishers."publisherId") AND
        (networkId IS NULL OR networkId = networks."networkId") AND
        (advertiserId IS NULL OR advertiserId = advertisers."advertiserId") AND
        (impressions."adShown" = TRUE);

    RETURN totalSpend;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.countimpressions(campaignid integer, adid integer, publisherid integer, networkid integer, advertiserid integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    totImpressions INTEGER;
BEGIN
    SELECT count(*)
    INTO totImpressions
    FROM impressions
    INNER JOIN campaigns ON impressions."campaignId" = campaigns."campaignId"
    INNER JOIN ads ON campaigns."adId" = ads."adId"
    INNER JOIN networks ON campaigns."networkId" = networks."networkId"
    INNER JOIN advertisers ON campaigns."advertiserId" = advertisers."advertiserId"
    INNER JOIN publishers ON networks."publisherId" = publishers."publisherId"
    WHERE 
        (campaignId IS NULL OR campaignId = campaigns."campaignId") AND
        (adId IS NULL OR adId = ads."adId") AND
        (publisherId IS NULL OR publisherId = publishers."publisherId") AND
        (networkId IS NULL OR networkId = networks."networkId") AND
        (advertiserId IS NULL OR advertiserId = advertisers."advertiserId") AND
        (impressions."adShown" = TRUE);

    RETURN totImpressions;
END;
$function$
;


