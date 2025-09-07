import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'twui-accordion',
  styleUrl: 'accordion.scss',
  shadow: false,
})
export class TWUIAccordion {
  @Prop() label?: string;
  @Prop() icon?: string;
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  private onToggle = (event: Event) => {
    const details = event.target as HTMLDetailsElement;
    this.open = details.open;
  };

  render() {
    return (
      <details open={this.open} onToggle={this.onToggle}>
        <summary>
          <twui-text format="subheading">{this.label}</twui-text>
          <iconify-icon icon="material-symbols:unfold-more-rounded"></iconify-icon>
        </summary>
        <section class="accordioncontent">
          <slot></slot>
        </section>
      </details>
    );
  }
}
