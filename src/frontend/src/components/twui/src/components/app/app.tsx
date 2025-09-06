import { Component, Host, State, h } from '@stencil/core';
import state from './globalStore';

@Component({
  tag: 'twui-app',
  styleUrl: 'app.scss',
  shadow: false,
})
export class TWUIApp {
  @State() lang?: string;

  componentWillLoad() {
    this.lang = state.lang;

    (state as any).__store?.onChange('lang', (newLang: string) => {
      this.lang = newLang;
    });
  }

  render() {
    return (
      <Host lang={this.lang}>
        <twui-header />
        <twui-pagecontainer>
          <twui-settings />
        </twui-pagecontainer>
      </Host>
    );
  }
}
