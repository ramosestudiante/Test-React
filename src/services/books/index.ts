import { Book } from "./types";
import { App } from "../../../config";

export default class ApiBooks {
  private apiBaseUrl: string;
  private apiKey?: string;
  private externalUrl?: string;

  constructor(apiKey?: string) {
    this.apiBaseUrl = `${App.appUrl}${App.version}`;
    this.externalUrl = `${App.urlExternal}`;
    this.apiKey = apiKey;
  }

  private async request<T>(
    endpoint: string,
    method: string = "GET",
    body?: []
  ): Promise<T> {
    const url = `${this.externalUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error ${response.status}: ${
            errorData.message || response.statusText
          }`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  public async getBooks(
    params: { name?: string; author?: string } = {}
  ): Promise<Book[]> {
    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const url = queryString ? `books?${queryString}` : "books";
    return this.request<Book[]>(url);
  }

  public async getBookById(id: number): Promise<Book> {
    return this.request<Book>(`/books/${id}`);
  }
}
