import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

