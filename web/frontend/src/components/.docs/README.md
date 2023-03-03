# Folder chứa những component không liên quan đến redux

## Yêu cầu

- Comment các field của props rõ ràng
- Chỉ export những thứ cần thiết tại file "index.ts" của mỗi component
- Storybook (Viết theo hướng dẫn từ offical documentation của Storybook)
- Testing 

## Related documentations
- [Storybook](https://storybook.js.org/docs/react/get-started/introduction)


## Example
```typescript
// components/Button/Button.tsx
export interface ButtonProps {
  /** Checks if the button should be disabled */
  isDisabled: boolean;
  /** The display content of the button*/
  content: string;
}

export const Button: React.FC<ButtonProps> = ({ isDisabled = false, content = '' }) => {
  return (
    <button type="button" disabled={isDisabled}>
      {content}
    </button>
  );
};
```

```typescript
// components/Button/Button.stories.tsx
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from "./Button";
import { withDesign } from 'storybook-addon-designs'


export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: "Button",
  component: Button,
  argTypes: {
    // NOTE: Những field cơ bản như 'number', 'text', 'boolean' thì storybook sẽ tự gen mà không cần phải định nghĩa. Chỉ cần định nghĩa các field dạng 'select', 'options', ...
    isDisabled: {
      control: 'boolean' // https://storybook.js.org/docs/react/essentials/controls
    },
    content: {
      control: 'text' // https://storybook.js.org/docs/react/essentials/controls
    }
  },
  args: {
    isDisabled: false,
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  },
  decorators: [withDesign], // https://storybook.js.org/addons/storybook-addon-designs
} as ComponentMeta<typeof Button>;

export const Default: ComponentStory<typeof Button> = (args) => <Button {...args} />;


// https://storybook.js.org/addons/storybook-addon-designs
Default.parameters = {
  type: 'figma',
  url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
}
```

```typescript
// Chỉ export những thứ cần thiết
export { ButtonProps, Button } from './Button';
```