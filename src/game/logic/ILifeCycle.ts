export interface ILifeCycle {
  init(): void;
  onResize(): void;
  update(): void;
  destroy(): void;
}
