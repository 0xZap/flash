import { ZapConfig } from "./zap_config";

// google_config.ts
export interface GoogleConfigParams {
  token?: string;
}

/**
 * Configuration class for Google API integration.
 */
export class GoogleConfig {
  private static instance: GoogleConfig | null = null;
  private readonly token: string;

  /**
   * Creates a new GoogleConfig instance.
   *
   * @param params - Optional configuration parameters for Google API
   */
  private constructor(params?: GoogleConfigParams) {
    try {
      // First try to get token from params
      if (params?.token) {
        this.token = params.token;
        return;
      }

      // Then try to get from ZapConfig
      const zapConfig = ZapConfig.getInstance();
      if (!zapConfig) {
        throw new Error("ZapConfig not initialized");
      }
      this.token = zapConfig.getGoogleToken();
    } catch (error) {
      throw new Error(
        "Failed to initialize GoogleConfig: " +
          (error instanceof Error ? error.message : "Unknown error"),
      );
    }
  }

  /**
   * Gets the singleton instance of GoogleConfig.
   *
   * @param params - Optional configuration parameters for Google API
   * @returns The GoogleConfig instance
   */
  public static getInstance(params?: GoogleConfigParams): GoogleConfig {
    if (!GoogleConfig.instance) {
      GoogleConfig.instance = new GoogleConfig(params);
    }
    return GoogleConfig.instance;
  }

  /**
   * Resets the singleton instance of GoogleConfig.
   */
  public static resetInstance(): void {
    GoogleConfig.instance = null;
  }

  /**
   * Gets the Google API token.
   *
   * @returns The Google API token string
   */
  public getToken(): string {
    if (!this.token) {
      throw new Error(
        "Google token not found. Please provide it via constructor or set GOOGLE_TOKEN environment variable.",
      );
    }
    return this.token;
  }
}
