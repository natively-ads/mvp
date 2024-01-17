alter table "public"."clicks" disable row level security;

set check_function_bodies = off;

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
        (advertiserId IS NULL OR advertiserId = advertisers."advertiserId");

    RETURN totalSpend;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.countclicks(campaignid integer, adid integer, publisherid integer, networkid integer, advertiserid integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    clickCount INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO clickCount
    FROM clicks
    INNER JOIN impressions ON clicks."impressionId" = impressions."impressionId"
    INNER JOIN campaigns ON impressions."campaignId" = campaigns."campaignId"
    INNER JOIN ads ON campaigns."adId" = ads."adId"
    INNER JOIN networks ON campaigns."networkId" = networks."networkId"
    INNER JOIN advertisers ON campaigns."advertiserId" = advertisers."advertiserId"
    INNER JOIN publishers ON networks."publisherId" = publishers."publisherId"
    WHERE 
        (campaignId IS NULL OR campaigns."campaignId" = campaignId) AND
        (adId IS NULL OR ads."adId" = adId) AND
        (publisherId IS NULL OR publishers."publisherId" = publisherId) AND
        (networkId IS NULL OR networks."publisherId" = networkId) AND
        (advertiserId IS NULL OR advertisers."advertiserId" = advertiserId);

    RETURN clickCount;
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
        (advertiserId IS NULL OR advertiserId = advertisers."advertiserId");

    RETURN totImpressions;
END;
$function$
;


