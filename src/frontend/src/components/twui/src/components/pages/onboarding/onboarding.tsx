import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-onboarding',
  styleUrl: 'onboarding.scss',
  shadow: false,
})
export class TWUIOnboarding {
  render() {
    return (
      <Host class="page">
        <img src="images/splash.png" />
        <section>
          <twui-text format="header" align="center">
            {state.dictionary.strings.pages.onboarding.title}
          </twui-text>
          <twui-text format="secondary" align="center">
            {state.dictionary.strings.pages.onboarding.subtitle}
          </twui-text>
        </section>
        <twui-button label="Create story"></twui-button>
      </Host>
    );
  }
}
