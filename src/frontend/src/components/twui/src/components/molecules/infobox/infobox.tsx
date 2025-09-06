import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-infobox',
  styleUrl: 'infobox.scss',
  shadow: false,
})
export class TWUIInfobox {
  @Prop() label?: string;
  @Prop() message?: string;
  @Prop() icon?: string;
  @Prop({ reflect: true }) color?: 'success' | 'warning' | 'error';

  render() {
    return (
      <Host color={this.color} aria-label={this.label}>
        {this.icon && <iconify-icon icon={this.icon}></iconify-icon>}
        <section class="container">
          <twui-text format="subheading">{this.label}</twui-text>
          {this.message && <twui-text class="message">{this.message}</twui-text>}
        </section>
      </Host>
    );
  }
}
