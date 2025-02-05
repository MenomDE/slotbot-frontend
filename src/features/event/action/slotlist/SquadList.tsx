import {Box, Group, NumberInput, TextInput} from '@mantine/core';
import {TEXT} from '../../../../utils/maxLength';
import {flexGrow} from '../../../../contexts/CommonStylings';
import {SlotListEntrySettings} from './SlotListEntrySettings';
import {AddButton} from '../../../../components/Button/AddButton';
import {useFormContext} from '../../../../contexts/event/action/EventActionFormContext';
import {useLanguage} from '../../../../contexts/language/Language';
import {useGetGuilds} from '../../../guilds/useGetGuilds';
import {SortableList} from '../../../../components/Form/Sortable/SortableList';
import {buildNewSlot, buildNewSquad} from './utils';
import {JSX} from 'react';

export function SquadList(): JSX.Element {
	const guildsQuery = useGetGuilds();

	const form = useFormContext();
	const {t} = useLanguage();

	return <>
		<SortableList<typeof form.values.squadList[number]>
			formPath={'squadList'} itemProps={{mt: 'sm', mb: 'xs', align: 'start'}} iconProps={{size: 'lg'}}
			renderItem={(squad, squadIndex) => (
				<Box key={squad.id}>
					<Group spacing={5} align={'start'}>
						<TextInput placeholder={t('squad.placeholder')}
								   maxLength={TEXT} required
								   styles={{root: flexGrow}}
								   {...form.getInputProps(`squadList.${squadIndex}.name`)}/>
						<SlotListEntrySettings
							entry={form.values.squadList[squadIndex]}
							path={'squadList'} index={squadIndex}
							guildsQuery={guildsQuery}/>
					</Group>
					<Box ml={'lg'}>
						<SortableList<typeof form.values.squadList[number]['slotList'][number]>
							formPath={`squadList.${squadIndex}.slotList`} itemProps={{mt: 'sm'}}
							renderItem={(slot, slotIndex) => {
								const slotList = `squadList.${squadIndex}.slotList`;
								return (
									<Group key={slot.id} align={'start'} spacing={'xs'}>
										<NumberInput min={1} style={{width: 'calc(3ch + 12px + 25px + 5px)'}}
													 {...form.getInputProps(`${slotList}.${slotIndex}.number`)}/>
										<TextInput
											placeholder={t('slot.placeholder')} styles={{root: flexGrow}}
											{...form.getInputProps(`${slotList}.${slotIndex}.name`)}/>
										<SlotListEntrySettings
											entry={form.values.squadList[squadIndex].slotList[slotIndex]} slot
											path={slotList} index={slotIndex} guildsQuery={guildsQuery}/>
									</Group>
								);
							}}/>
						<AddButton label={'slot.add'} mt={'xs'}
								   onClick={() => form.insertListItem(`squadList.${squadIndex}.slotList`, buildNewSlot(form))}/>
					</Box>
				</Box>
			)}/>
		<AddButton label={'squad.add'} mt={'xs'} onClick={() => form.insertListItem('squadList', buildNewSquad(form))}/>
	</>;
}
