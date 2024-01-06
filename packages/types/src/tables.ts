import { Database } from "./database";

export type Ad = Database["public"]["Tables"]["ads"]["Row"];
export type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];
export type Campaign = Database["public"]["Tables"]["campaigns"]["Row"];
export type Click = Database["public"]["Tables"]["clicks"]["Row"];
export type Impression = Database["public"]["Tables"]["impressions"]["Row"];
export type Network = Database["public"]["Tables"]["networks"]["Row"];
export type Publisher = Database["public"]["Tables"]["publishers"]["Row"];
