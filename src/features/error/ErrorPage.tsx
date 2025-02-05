import {Button, createStyles, Group, Text} from '@mantine/core';
import {JSX, PropsWithChildren} from 'react';
import {Link} from 'react-router-dom';
import {T} from '../../components/T';
import {TextKey} from '../../contexts/language/Language';
import {Bold} from '../../components/Text/Bold';

const useStyles = createStyles((theme) => ({
	label: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
		textShadow: `-3px -6px ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[4]}`,
		[theme.fn.smallerThan('sm')]: {
			fontSize: 120,
		},

		textAlign: 'center',
		lineHeight: 1,
		userSelect: 'none',
		position: 'relative',
		zIndex: 2,
	},

	title: {
		[theme.fn.smallerThan('sm')]: {
			fontSize: 32,
		},
	},

	description: {
		maxWidth: 540,
	},
}));

export function ErrorLabel(props: Readonly<PropsWithChildren>): JSX.Element {
	const {classes} = useStyles();

	return <Text align={'center'} size={220} weight={900} ff={'sans-serif'} mb={'xl'} className={classes.label}>{props.children}</Text>;
}

export function ErrorTitle(props: Readonly<{ title: TextKey }>): JSX.Element {
	const {classes} = useStyles();

	return <Bold align={'center'} size={38} className={classes.title}><T k={props.title}/></Bold>;
}

export function ErrorDescription(props: Readonly<{ description: TextKey }>): JSX.Element {
	const {classes} = useStyles();

	return <Text color={'dimmed'} size={'lg'} align={'center'} className={classes.description}>
		<T k={props.description}/>
	</Text>;
}

export function ErrorBackButton(): JSX.Element {
	return (
		<Group position={'center'}>
			<Button size={'lg'} variant={'outline'} component={Link} to={'/events'}>
				<T k={'navigation.backToCalendar'}/>
			</Button>
		</Group>
	);
}
