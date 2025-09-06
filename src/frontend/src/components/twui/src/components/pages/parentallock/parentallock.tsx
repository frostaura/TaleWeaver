import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-parentallock',
  shadow: false,
})
export class TWUIParentallock {
  render() {
    return <Host>{state.dictionary.strings.titles.parentallock}</Host>;
  }
}
