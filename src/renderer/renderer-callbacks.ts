import type { LayoutMode, ViewerSettings, ViewerState } from "../types";

export interface RendererCallbacks {
  goToPage(pageIndex: number): void;
  nextPage(): void;
  previousPage(): void;
  commitNextPage(): void;
  commitPreviousPage(): void;
  toggleOverlay(force?: boolean): void;
  toggleAutoPageTurn(): void;
  updateSettings(settings: Partial<ViewerSettings>): void;
  setLayoutMode(layoutMode: LayoutMode): void;
  setWideHeight(heightPx: number): void;
  setPanel(panel: ViewerState["panel"]): void;
  setZoom(scale: number, panX?: number, panY?: number): void;
  setPan(panX: number, panY: number): void;
  resetZoom(): void;
  notify(message: string, tone?: "info" | "success" | "error"): void;
  /** ロングタップ用。「ここすき！」に登録し、登録済みでもトーストを出す。 */
  pressFavorite(pageIndex: number): void;
  /** 「ここすき！」から外す。未登録なら何もしない。 */
  removeFavorite(pageIndex: number): void;
  /** ページ画像の読み込み失敗を通知する。 */
  reportPageLoadError(pageIndex: number): void;
  /** メニューの「戻る」操作をアプリ側へ通知する。 */
  requestBack(): void;
  /**
   * 全画面切替の要求。`fullscreenRequest` のリスナーがあればそちらへ委譲し、
   * 無ければライブラリ内で `browserFullscreen` に切り替える。
   */
  requestFullscreen(): void;
}
