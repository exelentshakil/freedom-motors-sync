export type ConversionType = 'rear-entry' | 'side-entry' | 'driver-transfer';
export type RampOperation = 'automatic' | 'manual-spring';
export type InventoryStatus = 'in_stock' | 'in_transit' | 'in_production' | 'reserved' | 'sold';

export interface Vehicle {
  id: string;
  slug: string;
  // --- AUTOMATED SYNC FIELDS (FTP EXCEL FEED • LOCKED READ-ONLY IN STUDIO) ---
  vin: string;
  stockNumber: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  chassisMileage: number;
  exteriorColor: string;
  interiorColor: string;
  transmission: string;
  fuelType: string;
  engine: string;
  conversionType: ConversionType;
  rampOperation: RampOperation;
  rampWidthInches: number;
  doorHeightInches: number;
  rampLengthInches: number;
  floorDropInches: number;
  kneelingSuspension: boolean;
  adaCompliant: boolean;
  wheelchairPositions: number;
  baseMSRP: number;
  salePrice: number;
  inventoryStatus: InventoryStatus;
  lastSyncTimestamp: string;
  ftpSourceFile: string;
  rawFtpImages: string[];
  
  // --- SANITY STUDIO EDITORIAL FIELDS (HAND EDITED IN STUDIO • PRESERVED ACROSS SYNCS) ---
  customTitle?: string;
  marketingHeadline: string;
  editorialDescription: string;
  highlightTags: string[];
  curatedGallery?: string[];
  walkthroughVideoUrl?: string;
  featuredPromoBadge?: string;
  staffPick: boolean;
  assignedMobilitySpecialist: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  financingOffer: {
    apr: string;
    termMonths: number;
    monthlyEst: number;
  };
}

export interface SyncAuditRecord {
  batchId: string;
  timestamp: string;
  filename: string;
  recordsRead: number;
  addedCount: number;
  updatedCount: number;
  soldCount: number;
  unchangedCount: number;
  status: 'SUCCESS' | 'PARTIAL_WARNING' | 'FAILED';
  durationMs: number;
  webhookTriggered: boolean;
  revalidationLatencyMs: number;
  diffSummary: Array<{
    vin: string;
    model: string;
    changeType: 'NEW_INSERT' | 'PRICE_CHANGE' | 'STATUS_FLIP' | 'SPEC_UPDATE' | 'MARKED_SOLD';
    detail: string;
  }>;
}

export interface RevalidationEvent {
  id: string;
  timestamp: string;
  type: 'tag' | 'path';
  target: string;
  source: 'sanity_webhook' | 'studio_publish' | 'ftp_sync_daemon' | 'manual_test';
  status: 200 | 400 | 401 | 500;
  latencyMs: number;
  environment: 'development' | 'staging' | 'production';
  payloadSummary: string;
}

export interface DataLayerEvent {
  event: string;
  timestamp: string;
  payload: Record<string, unknown>;
}
