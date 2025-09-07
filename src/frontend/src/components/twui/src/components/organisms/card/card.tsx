import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-card',
  styleUrl: 'card.scss',
  shadow: false,
})
export class TWUICard {
  @Prop() label?: string;
  @Prop() icon?: string;
  @Prop() filled?: boolean = true;
  render() {
    return (
      <Host>
        <header>
          {this.label && <twui-text format="subheading">{this.label}</twui-text>}
          {this.icon && <iconify-icon icon={this.icon}></iconify-icon>}
        </header>

        <slot name="beforecontent"></slot>
        <section
          class={{
            container: true,
            filled: this.filled,
          }}
        >
          <slot></slot>
        </section>
        <slot name="aftercontent"></slot>
      </Host>
    );
  }
}
