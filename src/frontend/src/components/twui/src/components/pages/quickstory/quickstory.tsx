import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-quickstory',
  shadow: false,
})
export class TWUIQuickstory {
  render() {
    return <Host>{state.dictionary.strings.titles.quickstory}</Host>;
  }
}
