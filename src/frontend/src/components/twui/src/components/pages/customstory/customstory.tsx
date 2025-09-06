import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-customstory',
  shadow: false,
})
export class TWUICustomstory {
  render() {
    return <Host>{state.dictionary.strings.titles.customstory}</Host>;
  }
}
