export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			ads: {
				Row: {
					adId: number;
					advertiserId: number;
					content: Json;
					created_at: string;
					networkId: number;
				};
				Insert: {
					adId?: number;
					advertiserId: number;
					content: Json;
					created_at?: string;
					networkId: number;
				};
				Update: {
					adId?: number;
					advertiserId?: number;
					content?: Json;
					created_at?: string;
					networkId?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'ads_advertiserId_fkey';
						columns: ['advertiserId'];
						isOneToOne: false;
						referencedRelation: 'advertisers';
						referencedColumns: ['advertiserId'];
					},
					{
						foreignKeyName: 'ads_networkId_fkey';
						columns: ['networkId'];
						isOneToOne: false;
						referencedRelation: 'networks';
						referencedColumns: ['networkId'];
					},
				];
			};
			advertisers: {
				Row: {
					advertiserId: number;
					created_at: string;
					name: string;
				};
				Insert: {
					advertiserId?: number;
					created_at?: string;
					name: string;
				};
				Update: {
					advertiserId?: number;
					created_at?: string;
					name?: string;
				};
				Relationships: [];
			};
			campaigns: {
				Row: {
					adId: number;
					advertiserId: number;
					budget: number;
					campaignId: number;
					cpmBid: number;
					created_at: string;
					end_date: string;
					networkId: number;
					start_date: string;
					title: string | null;
				};
				Insert: {
					adId: number;
					advertiserId: number;
					budget: number;
					campaignId?: number;
					cpmBid: number;
					created_at?: string;
					end_date: string;
					networkId: number;
					start_date: string;
					title?: string | null;
				};
				Update: {
					adId?: number;
					advertiserId?: number;
					budget?: number;
					campaignId?: number;
					cpmBid?: number;
					created_at?: string;
					end_date?: string;
					networkId?: number;
					start_date?: string;
					title?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'campaigns_adId_fkey';
						columns: ['adId'];
						isOneToOne: false;
						referencedRelation: 'ads';
						referencedColumns: ['adId'];
					},
					{
						foreignKeyName: 'campaigns_advertiserId_fkey';
						columns: ['advertiserId'];
						isOneToOne: false;
						referencedRelation: 'advertisers';
						referencedColumns: ['advertiserId'];
					},
					{
						foreignKeyName: 'campaigns_networkId_fkey';
						columns: ['networkId'];
						isOneToOne: false;
						referencedRelation: 'networks';
						referencedColumns: ['networkId'];
					},
				];
			};
			clicks: {
				Row: {
					clickId: number;
					impressionId: number;
					timestamp: string;
				};
				Insert: {
					clickId?: number;
					impressionId: number;
					timestamp?: string;
				};
				Update: {
					clickId?: number;
					impressionId?: number;
					timestamp?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'clicks_impressionId_fkey';
						columns: ['impressionId'];
						isOneToOne: false;
						referencedRelation: 'impressions';
						referencedColumns: ['impressionId'];
					},
				];
			};
			impressions: {
				Row: {
					campaignId: number;
					impressionId: number;
					price: number;
					publisherId: number;
					timestamp: string;
				};
				Insert: {
					campaignId: number;
					impressionId?: number;
					price: number;
					publisherId: number;
					timestamp?: string;
				};
				Update: {
					campaignId?: number;
					impressionId?: number;
					price?: number;
					publisherId?: number;
					timestamp?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'impressions_campaignId_fkey';
						columns: ['campaignId'];
						isOneToOne: false;
						referencedRelation: 'campaigns';
						referencedColumns: ['campaignId'];
					},
					{
						foreignKeyName: 'impressions_publisherId_fkey';
						columns: ['publisherId'];
						isOneToOne: false;
						referencedRelation: 'publishers';
						referencedColumns: ['publisherId'];
					},
				];
			};
			networks: {
				Row: {
					adFormat: Json;
					created_at: string;
					description: string | null;
					name: string | null;
					networkId: number;
					publisherId: number;
					reservePrice: number;
				};
				Insert: {
					adFormat: Json;
					created_at?: string;
					description?: string | null;
					name?: string | null;
					networkId?: number;
					publisherId: number;
					reservePrice?: number;
				};
				Update: {
					adFormat?: Json;
					created_at?: string;
					description?: string | null;
					name?: string | null;
					networkId?: number;
					publisherId?: number;
					reservePrice?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'networks_publisherId_fkey';
						columns: ['publisherId'];
						isOneToOne: false;
						referencedRelation: 'publishers';
						referencedColumns: ['publisherId'];
					},
				];
			};
			publishers: {
				Row: {
					created_at: string;
					name: string;
					publisherId: number;
				};
				Insert: {
					created_at?: string;
					name: string;
					publisherId?: number;
				};
				Update: {
					created_at?: string;
					name?: string;
					publisherId?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					owner_id: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					owner_id: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						isOneToOne: false;
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
	  ? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
	    }
			? R
			: never
	  : never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
	    }
			? I
			: never
	  : never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	  ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
	    }
			? U
			: never
	  : never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	  ? Database['public']['Enums'][PublicEnumNameOrOptions]
	  : never;
