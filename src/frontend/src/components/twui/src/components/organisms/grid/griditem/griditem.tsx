import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-griditem',
  styleUrl: 'griditem.scss',
  shadow: false,
})
export class TWUIGriditem {
  @Prop() label?: string;
  @Prop() icon?: string;
  render() {
    return (
      <Host>
        {this.icon && <iconify-icon icon={this.icon} class="griditemicon"></iconify-icon>}
        {this.label && (
          <twui-text format="secondary" align="center">
            {this.label}
          </twui-text>
        )}
      </Host>
    );
  }
}
