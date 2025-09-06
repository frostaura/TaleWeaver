import { Component, Host, h } from '@stencil/core';
import state from '../../app/globalStore';

@Component({
  tag: 'twui-parentallock',
  shadow: false,
})
export class TWUIParentallock {
  render() {
    return (
      <Host class="page">
        <section>
          <twui-text format="header">{state.dictionary.strings.pages.parentallock.title}</twui-text>
          <twui-text format="secondary">{state.dictionary.strings.pages.parentallock.subtitle}</twui-text>
        </section>

        <twui-card label="Set up" icon="ri:parent-line">
          <twui-text format="secondary">
            Create a 4-digit PIN to lock specific modes and ensure your child's safety. You can choose which modes to lock after setting up the PIN.
          </twui-text>
          <ul>
            <li>🚫 Restrict access to certain story modes</li>
            <li>⏰ Set time limits for story generation</li>
            <li>🔍 Monitor story content and themes</li>
            <li>👨‍👩‍👧‍👦 Parent-only access to settings</li>
          </ul>
          <twui-button iconbefore="basil:lock-outline" label="Setup PIN"></twui-button>
        </twui-card>

        <twui-card label="Controls" icon="carbon:exam-mode">
          <twui-text format="secondary">Quick Play</twui-text>
          <twui-text format="secondary">Custom Story</twui-text>
        </twui-card>
      </Host>
    );
  }
}
