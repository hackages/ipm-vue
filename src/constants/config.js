const devConfig = {
  apiUrl: 'https://vue-server-yibhuhmife.now.sh/api',
};

const prodConfig = {
  apiUrl: 'https://vue-server-yibhuhmife.now.sh/api',
};

export const getConfig = () =>
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
