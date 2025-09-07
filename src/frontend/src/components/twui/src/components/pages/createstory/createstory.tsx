import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-createstory',
  shadow: false,
})
export class TWUICreatestory {
  render() {
    return (
      <Host class="page">
        <section>
          <twui-text format="header">{state.dictionary.strings.pages.createstory.title}</twui-text>
          <twui-text format="secondary">{state.dictionary.strings.pages.createstory.subtitle}</twui-text>
        </section>

        <twui-card label="Choose a theme" icon="mingcute:paint-brush-ai-line" filled={false}>
          <twui-grid>
            <twui-griditem icon="noto:unicorn" label="Magical Adventure"></twui-griditem>
            <twui-griditem icon="noto:first-quarter-moon-face" label="Peaceful Dreams"></twui-griditem>
            <twui-griditem icon="noto:rocket" label="Space Explorer"></twui-griditem>
            <twui-griditem icon="noto:bear" label="Forest Friends"></twui-griditem>
            <twui-griditem icon="noto:crown" label="Fairy Tale"></twui-griditem>
            <twui-griditem icon="noto:dolphin" label="Ocean Adventure"></twui-griditem>
          </twui-grid>
          <twui-accordion label="Customise">
            <twui-text format="secondary">Custom stuff goes here</twui-text>
            <twui-text format="secondary">Custom stuff goes here</twui-text>
            <twui-text format="secondary">Custom stuff goes here</twui-text>
          </twui-accordion>
        </twui-card>
        <twui-button iconbefore="mingcute:ai-line" label="Generate Story"></twui-button>
      </Host>
    );
  }
}
