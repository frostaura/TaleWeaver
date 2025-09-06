import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-profile',
  shadow: false,
})
export class TWUIProfile {
  render() {
    return <Host>{state.dictionary.strings.titles.profile}</Host>;
  }
}
