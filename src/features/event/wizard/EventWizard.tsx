import {LoadingOverlay} from '@mantine/core';
import {Breadcrumb} from '../../../components/Breadcrumb';
import {JSX, useState} from 'react';
import {EventDetailsDto} from '../eventTypes';
import {randomColor} from '../action/utils';
import {eventActionValidate} from '../action/validation';
import {EventWizardProvider, useEventWizardForm} from '../../../contexts/event/action/EventActionFormContext';
import {EventWizardSteps} from './EventWizardSteps';
import {useEventCopy} from './useEventCopy';
import {useTranslatedDocumentTitle} from '../../../hooks/useTranslatedDocumentTitle';
import {getTimeShort} from '../../../utils/dateHelper';

export type EventWizardLocation = {
	copy: EventDetailsDto['id'];
}

export function EventWizard(): JSX.Element {
	useTranslatedDocumentTitle('documentTitle.event.new');
	const breadcrumbItems = [
		{
			title: 'breadcrumb.calendar',
			href: '/events',
		},
		{
			title: 'breadcrumb.event.new',
		},
	];

	const [active, setActive] = useState(0);

	const date = new Date();
	const form = useEventWizardForm({
		initialValues: {
			hidden: false,
			shareable: true,
			name: '',
			date: date,
			startTime: getTimeShort(date),
			creator: '',
			eventType: {
				name: '',
				color: randomColor(),
			},
			description: '',
			missionType: '',
			missionLength: '',
			pictureUrl: '',
			details: [],
			squadList: [],
			reserveParticipating: undefined,
		},
		validate: (values) => eventActionValidate(values, active),
		//Works only on first page as no state can be used inside on change validation (https://discord.com/channels/854810300876062770/1026255061241839627)
		validateInputOnChange: ['name', 'date', 'creator', 'eventType', 'description', 'missionType', 'missionLength', 'pictureUrl'],
		validateInputOnBlur: true,
	});

	const {isLoading} = useEventCopy(form);

	return (
		<EventWizardProvider form={form}>
			<Breadcrumb items={breadcrumbItems}/>

			<LoadingOverlay visible={isLoading}/>
			<EventWizardSteps active={active} setActive={setActive}/>
		</EventWizardProvider>
	);
}
