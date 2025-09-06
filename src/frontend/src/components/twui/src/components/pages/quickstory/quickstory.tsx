import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-quickstory',
  shadow: false,
})
export class TWUIQuickstory {
  render() {
    return (
      <Host class="page">
        <twui-text format="header">{state.dictionary.strings.pages.quickstory.title}</twui-text>
        <twui-text format="secondary">{state.dictionary.strings.pages.quickstory.subtitle}</twui-text>
      </Host>
    );
  }
}
