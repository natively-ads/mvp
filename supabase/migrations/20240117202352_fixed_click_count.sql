set check_function_bodies = off;

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
        (networkId IS NULL OR networks."networkId" = networkId) AND
        (advertiserId IS NULL OR advertisers."advertiserId" = advertiserId);
    RETURN clickCount;
END;
$function$
;


