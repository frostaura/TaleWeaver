import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-upgrade',
  shadow: false,
})
export class TWUIUpgrade {
  render() {
    return <Host>{state.dictionary.strings.titles.upgrade}</Host>;
  }
}
