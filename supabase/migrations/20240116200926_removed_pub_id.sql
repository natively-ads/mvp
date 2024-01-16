alter table "public"."impressions" drop constraint "impressions_publisherId_fkey";

alter table "public"."impressions" drop column "publisherId";

alter table "public"."impressions" alter column "price" set data type real using "price"::real;


