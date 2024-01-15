alter table "public"."campaigns" add column "end_date" date;

alter table "public"."campaigns" add column "start_date" date;

alter table "public"."campaigns" alter column "budget" drop default;

alter table "public"."campaigns" alter column "budget" set data type real using "budget"::real;

alter table "public"."campaigns" alter column "cpmBid" drop default;

alter table "public"."campaigns" alter column "cpmBid" set data type real using "cpmBid"::real;


