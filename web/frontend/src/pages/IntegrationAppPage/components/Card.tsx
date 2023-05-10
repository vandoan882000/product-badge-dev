import Button from 'components/Button';
import parse from 'html-react-parser';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { IntegrationApp } from '../models/IntegrationApp';

export const Card = ({ description, featuredImage, features, buttonLink, buttonText = 'Connect' }: IntegrationApp) => {
  return (
    <View
      css={{
        display: 'flex',
        borderRadius: '8px',
        backgroundColor: '#fff',
        padding: '16px',
        gap: '16px',
        height: '100%',
      }}
    >
      <View
        css={{
          borderRadius: 'inherit',
          flex: '1 1 45%',
          width: '45%',
          objectFit: 'contain',
        }}
        tagName="img"
        src={featuredImage}
      />
      <View css={{ flex: 'auto', width: '55%' }}>
        <View>
          <View css={{ marginBottom: '20px', fontSize: '18px' }}>{parse(description)}</View>
          <View tagName="ul" css={{ marginBottom: '20px', padding: 0, listStyleType: 'none' }}>
            {features?.map((feature, index) => {
              return (
                <View
                  key={index}
                  tagName="li"
                  css={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <FontAwesome type="fal" name="check-circle" color="primary" size={24} />
                  <Text tagName="span" size={16}>
                    {feature}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <Button
          css={{
            '& > span': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
          radius={10}
          target="blank"
          href={buttonLink}
          colorHover="light"
        >
          <FontAwesome type="fal" name="link" size={24} css={{ marginRight: '8px' }} />
          <Text tagName="span" size={16}>
            {buttonText}
          </Text>
        </Button>
      </View>
    </View>
  );
};
