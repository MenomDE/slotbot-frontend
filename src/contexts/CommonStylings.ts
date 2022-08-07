import {CSSObject} from "@mantine/core";

export const ellipsis: CSSObject = {
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};

export const flexGrow = {
	flexGrow: '1 !important',
}

export const underlineOnHover: CSSObject = {
	'&:hover': {
		cursor: 'pointer',
		textDecoration: 'underline',
	},
}
