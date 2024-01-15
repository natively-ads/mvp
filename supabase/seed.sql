INSERT INTO "public"."advertisers" ("created_at", "advertiserId", "name") VALUES
        ('2024-01-15 02:14:31.578516+00', 1, 'The US Ad Agency'),
        ('2024-01-15 02:14:49.551285+00', 2, 'Sterling Cooper & Partners');

INSERT INTO "public"."publishers" ("created_at", "name", "publisherId") VALUES
        ('2024-01-15 02:07:57.914574+00', 'GameManiacs', 1),
        ('2024-01-15 02:07:57.914574+00', 'The Nightly Tea', 2),
        ('2024-01-15 02:07:57.914574+00', 'FileConverter Pro', 3);

INSERT INTO "public"."networks" ("networkId", "created_at", "publisherId", "name", "description", "adFormat", "reservePrice") VALUES
        (1, '2024-01-15 02:10:47.701516+00', 1, 'The Jumping Brothers', 'The Jumping Brothers is an iOS and Android game played by tens of thousands of players daily.', '{"link": "string", "blurb": "string", "title": "string"}', 12),
        (2, '2024-01-15 02:12:56.74279+00', 2, 'The Nightly Tea Newsletter', 'Finance newsletter read by thousands of business professionals every week', '{"link": "string", "blurb": "string", "title": "string"}', 50),
        (3, '2024-01-15 02:13:55.480038+00', 3, 'FileConverter Pro Card Ad', 'Website that developer uses to convert files. Sponsorships are displayed while the file is loading.', '{"link": "string", "blurb": "string", "title": "string"}', 18);


INSERT INTO "public"."ads" ("adId", "created_at", "networkId", "advertiserId", "content") VALUES
        (1, '2024-01-15 02:16:49.332641+00', 2, 1, '{"link": "gruvian.com", "blurb": "The cloud will never be the same!", "title": "CloudSquare"}'),
        (2, '2024-01-15 02:17:21.162215+00', 2, 1, '{"link":"gruvian.com","blurb":"Cheaper rates than competitors!","title":"Try CloudSquare"}');



INSERT INTO "public"."campaigns" ("campaignId", "created_at", "advertiserId", "title", "budget", "cpmBid", "networkId", "adId", "end_date", "start_date") VALUES
        (4, '2024-01-15 02:40:55.254788+00', 1, 'My First Campaign', 420, 52.5, 2, 2, '2024-01-24', '2024-01-10');


