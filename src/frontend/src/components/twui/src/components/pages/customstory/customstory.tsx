import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-customstory',
  shadow: false,
})
export class TWUICustomstory {
  render() {
    return (
      <Host class="page">
        <section>
          <twui-text format="header">{state.dictionary.strings.pages.customstory.title}</twui-text>
          <twui-text format="secondary">{state.dictionary.strings.pages.customstory.subtitle}</twui-text>
        </section>
      </Host>
    );
  }
}
