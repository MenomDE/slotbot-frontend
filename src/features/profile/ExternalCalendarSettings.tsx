import {UserOwnProfileDto} from './profileTypes';
import {ElementWithInfo} from '../../components/Text/ElementWithInfo';
import {Box, Button, CopyButton, Switch, Text, Title, Tooltip} from '@mantine/core';
import {AnchorBlank} from '../../components/Text/AnchorBlank';
import {JSX, useState} from 'react';
import slotbotServerClient, {voidFunction} from '../../hooks/slotbotServerClient';
import {useMutation} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {errorNotification, successNotification} from '../../utils/notificationHelper';
import {T} from '../../components/T';
import {useDidUpdate} from '@mantine/hooks';

type ExternalCalendarSettingsProps = Pick<UserOwnProfileDto, 'externalCalendarIntegrationActive' | 'icsCalendarUrl'>;

export function ExternalCalendarSettings(props: Readonly<ExternalCalendarSettingsProps>): JSX.Element {
	const {externalCalendarIntegrationActive, icsCalendarUrl} = props;

	const [selectedSetting, setSelectedSetting] = useState(externalCalendarIntegrationActive);
	const [savedSetting, setSavedSetting] = useState(externalCalendarIntegrationActive);

	const postCalendarSetting = () => slotbotServerClient.put(`/user/externalcalendar/${selectedSetting}`).then(voidFunction);
	const {mutate, isPending} = useMutation<void, AxiosError>({
		mutationFn: postCalendarSetting,
		onSuccess: () => {
			setSavedSetting(selectedSetting);
			successNotification();
		},
		onError: (...props) => {
			setSelectedSetting(savedSetting);
			errorNotification?.(...props);
		},
	});

	useDidUpdate(() => {
		selectedSetting !== savedSetting && mutate();
	}, [selectedSetting]);

	return (
		<>
			<Title order={3}>
				<ElementWithInfo text={<T k={'profile.externalCalendar.title'}/>}
								 tooltip={<T k={'profile.externalCalendar.tooltip'}/>}
								 multiline tooltipWidth={300} tooltipPosition={'right'}/>
			</Title>
			<Switch label={<T k={'profile.externalCalendar.switch'}/>} checked={selectedSetting} disabled={isPending}
					onChange={(event) => setSelectedSetting(event.currentTarget.checked)}/>
			{selectedSetting && <>
                <Tooltip.Floating label={<T k={'action.clickToCopy'}/>}>
                    <Box>
                        <CopyButton value={icsCalendarUrl}>
							{({copied, copy}) => (
								<Button color={copied ? 'teal' : 'blue'} variant={'outline'} onClick={copy}
										sx={{width: '100%'}}>
									{icsCalendarUrl}
								</Button>
							)}
                        </CopyButton>
                    </Box>
                </Tooltip.Floating>
                <Text>
                    <T k={'profile.externalCalendar.tutorial.partOne'}/> <AnchorBlank
                    href={'https://docs.webalf.de/slotbot/eventkalender#kalender-synchronisation'}>
                    <T k={'profile.externalCalendar.tutorial.partTwo'}/></AnchorBlank>.
                </Text>
            </>
			}
		</>
	);
}
