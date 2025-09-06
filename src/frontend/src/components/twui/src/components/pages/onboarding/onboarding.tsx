import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-onboarding',
  shadow: false,
})
export class TWUIOnboarding {
  render() {
    return <Host>{state.dictionary.strings.titles.onboarding}</Host>;
  }
}
