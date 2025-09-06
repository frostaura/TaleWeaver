import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-privacy',
  shadow: false,
})
export class TWUIPrivacy {
  render() {
    return <Host>{state.dictionary.strings.titles.privacy}</Host>;
  }
}
