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

        <twui-card label="Theme" icon="mingcute:paint-brush-ai-line" filled={false}>
          <twui-grid>
            <twui-griditem icon="noto:unicorn" label="Magical Adventure"></twui-griditem>
            <twui-griditem icon="noto:first-quarter-moon-face" label="Peaceful Dreams"></twui-griditem>
            <twui-griditem icon="noto:rocket" label="Space Explorer"></twui-griditem>
            <twui-griditem icon="noto:bear" label="Forest Friends"></twui-griditem>
            <twui-griditem icon="noto:crown" label="Fairy Tale"></twui-griditem>
            <twui-griditem icon="noto:dolphin" label="Ocean Adventure"></twui-griditem>
          </twui-grid>
          <twui-accordion label="Customise">
            <twui-card label="Characters" icon="octicon:people-24" filled={false}>
              <twui-grid>
                <twui-griditem icon="noto:unicorn" label="Unicorn"></twui-griditem>
                <twui-griditem icon="noto:dragon-face" label="Dragon"></twui-griditem>
                <twui-griditem icon="noto:woman-fairy-medium-light-skin-tone" label="Fairy"></twui-griditem>
                <twui-griditem icon="noto:robot" label="Robot"></twui-griditem>
                <twui-griditem icon="noto:bear" label="Bear"></twui-griditem>
                <twui-griditem icon="noto:dolphin" label="Dolphin"></twui-griditem>
              </twui-grid>
            </twui-card>
            <twui-card label="Setting" icon="teenyicons:pin-outline" filled={false}>
              <twui-grid>
                <twui-griditem icon="noto:deciduous-tree" label="Enchanted Forest"></twui-griditem>
                <twui-griditem icon="noto:castle" label="Magic Castle"></twui-griditem>
                <twui-griditem icon="noto:water-wave" label="Deep Ocean"></twui-griditem>
                <twui-griditem icon="noto:ringed-planet" label="Outer Space"></twui-griditem>
                <twui-griditem icon="noto:house-with-garden" label="Cosy Village"></twui-griditem>
                <twui-griditem icon="noto:snow-capped-mountain" label="Tall Mountains"></twui-griditem>
              </twui-grid>
            </twui-card>
          </twui-accordion>
        </twui-card>
        <twui-button iconbefore="mingcute:ai-line" label="Generate Story"></twui-button>
      </Host>
    );
  }
}
