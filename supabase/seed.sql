INSERT INTO "public"."advertisers" ("created_at", "advertiserId", "name") VALUES
        ('2024-01-15 02:14:31.578516+00', 1, 'The US Ad Agency'),
        ('2024-01-15 02:14:49.551285+00', 2, 'Sterling Cooper & Partners');

INSERT INTO "public"."publishers" ("created_at", "name", "publisherId") VALUES
        ('2024-01-15 02:07:57.914574+00', 'GameManiacs', 1),
        ('2024-01-15 02:07:57.914574+00', 'The Nightly Tea', 2),
        ('2024-01-15 02:07:57.914574+00', 'FileConverter Pro', 3);

INSERT INTO "public"."networks" ("networkId", "created_at", "publisherId", "name", "description", "adFormat", "reservePrice") VALUES
        (1001, '2024-01-15 02:10:47.701516+00', 1, 'The Jumping Brothers', 'The Jumping Brothers is an iOS and Android game played by tens of thousands of players daily.', '{"type": "object", "properties": {"link": {"type": "string"}, "blurb": {"type": "string"}, "title": {"type": "string"}}, "required": ["link", "blurb", "title"]}', 12),
        (1002, '2024-01-15 02:12:56.74279+00', 2, 'The Nightly Tea Newsletter', 'Finance newsletter read by thousands of business professionals every week', '{"type": "object", "properties": {"link": {"type": "string"}, "blurb": {"type": "string"}, "title": {"type": "string"}}, "required": ["link", "blurb", "title"]}', 50),
        (1003, '2024-01-15 02:13:55.480038+00', 3, 'FileConverter Pro Card Ad', 'Website that developer uses to convert files. Sponsorships are displayed while the file is loading.', '{"type": "object", "properties": {"link": {"type": "string"}, "blurb": {"type": "string"}, "title": {"type": "string"}}, "required": ["link", "blurb", "title"]}', 18);


INSERT INTO "public"."ads" ("adId", "created_at", "networkId", "advertiserId", "content") VALUES
        (1, '2024-01-15 02:16:49.332641+00', 1002, 1, '{"link": "gruvian.com", "blurb": "The cloud will never be the same!", "title": "CloudSquare"}'),
        (2, '2024-01-15 02:17:21.162215+00', 1002, 1, '{"link":"gruvian.com","blurb":"Cheaper rates than competitors!","title":"Try CloudSquare"}');



INSERT INTO "public"."campaigns" ("campaignId", "created_at", "advertiserId", "title", "budget", "cpmBid", "networkId", "adId", "end_date", "start_date") VALUES
        (4, '2024-01-15 02:40:55.254788+00', 1, 'My First Campaign', 420, 60.5, 1002, 2, '2024-01-24', '2024-01-10');


INSERT INTO impressions ("impressionId", "campaignId", price, timestamp) VALUES
(1, 4, 55.56, '2024-01-16 20:10:46.458089+00'),
(2, 4, 57.3, '2024-01-16 20:11:01.856476+00'),
(3, 4, 52.6, '2024-01-16 20:11:14.005498+00'),
(4, 4, 50.9, '2024-01-16 20:11:26.627615+00'),
(5, 4, 53, '2024-01-16 20:11:38.709947+00'),
(6, 4, 55, '2024-01-16 21:20:58.317609+00'),
(7, 4, 55, '2024-01-16 21:21:05.361789+00'),
(9, 4, 52, '2024-01-16 21:21:17.375833+00');


INSERT INTO clicks ("clickId", timestamp, "impressionId") VALUES
(1, '2024-01-16 20:11:50.116898+00', 2),
(2, '2024-01-16 20:12:04.441853+00', 5),
(3, '2024-01-16 20:22:19.524584+00', 4);
