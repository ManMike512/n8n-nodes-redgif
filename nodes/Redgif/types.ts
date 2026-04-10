/**
 * Type definitions for WWebJS API Node
 */

import type { IDataObject } from "n8n-workflow";

// ═══════════════════════════════════════════════════════════════════
// Content Types
// ═══════════════════════════════════════════════════════════════════
export type NicheSortingType = "hot" | "latest" | "top" ;


export interface Gif {
  avgColor: string;
  canBoost: boolean;
  createDate: number;
  contentType: string;
  cta: string | null;
  description: string|null;
  duration: number;
  folders: string | null;
  gallery: string | null;
  hasAudio: boolean;
  height: number;
  hideHome: boolean;
  hideTrending: boolean;
  hls: boolean;
  id: string;
  likes: number;
  niches: string[] | null;
  published: boolean;
  type:number;
  sexuality: string[] | null;
  tags: string[] | null;
  urls:{
    poster: string | null;
    silent: string | null;
    thumbnail: string | null;
    hd: string | null;
    html: string | null;
    sd: string | null;
  } | null;
  userName: string | null;
  verified: boolean;
  views: number;
  width: number;
  promoted: boolean | null;
}

// ═══════════════════════════════════════════════════════════════════
// Validation
// ═══════════════════════════════════════════════════════════════════

export interface ValidationResult {
  valid: boolean;
  error?: string;
}


// ═══════════════════════════════════════════════════════════════════
// API Response Types
// ═══════════════════════════════════════════════════════════════════

export interface RedGifsApiResponse extends IDataObject {
  success?: boolean;
  message?: string;
  data?: IDataObject | IDataObject[];
}



export interface Niches extends IDataObject {
  gifs: Gif[];
  niches:        {
            cover: string | null;
            description: string | null;
            gifs: number | null;
            id: string | null;
            name: string | null;
            owner: string | null;
            subscribers: number | null;
            thumbnail: string | null;
            rules: string | null;
        }[];
  page: number;
  pages: number;
  total: number;
        
}

// ═══════════════════════════════════════════════════════════════════
// Get Niches Options
// ═══════════════════════════════════════════════════════════════════

export interface GetNichesOptions extends IDataObject {
  page?: number;
  count?: number;
  order?: NicheSortingType;
}