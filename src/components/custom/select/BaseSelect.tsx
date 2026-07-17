import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '_components/ui/select';
import { BaseText, CustomSkeletonLoader } from '_components/custom';
import { InputGroup } from '_components/ui/input-group';
import { Flex, Input } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';
import { VariablesColors } from '_theme/variables';
import React, { FC, useMemo, useState } from 'react';
import { BaseSelectProps } from './interface/select';
import { useTranslation } from 'react-i18next';

export const BaseSelect: FC<BaseSelectProps> = ({
  listItems,
  label,
  placeholder = 'COMMON.SELECT_OPTIONS',
  width = 'full',
  variant = 'subtle',
  isDisabled = false,
  isClearable = true,
  showDropdownIcon = true,
  onChangeFunc,
  isLoading,
  value,
  ref,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!listItems?.items?.length) return [];
    return listItems?.items.filter((item: { label: string }) =>
      item?.label?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [listItems, searchTerm]);

  return (
    <SelectRoot
      variant={variant}
      required={false}
      lazyMount
      value={value}
      unmountOnExit
      closeOnSelect
      onValueChange={(item) => {
        onChangeFunc?.(item?.value);
      }}
      multiple={false}
      collection={listItems?.items?.length ? listItems : undefined}
      width={width}
    >
      {label && (
        <SelectLabel display={'flex'} gap={'6px'} fontSize={'14px'} alignItems={'center'}>
          {isLoading ? <CustomSkeletonLoader type="TEXT" numberOfLines={1} /> : t(label)}
        </SelectLabel>
      )}

      {isLoading ? (
        <CustomSkeletonLoader type="FORM" height={'50px'} width={'100%'} />
      ) : (
        <React.Fragment>
          <SelectTrigger
            clearable={isClearable}
            showDropdownIcon={showDropdownIcon}
            isError={false}
          >
            <SelectValueText placeholder={t(placeholder)} color={'inherit'} fontSize={'14px'} />
          </SelectTrigger>

          <SelectContent borderRadius={'12px'} p={3} portalRef={ref} maxH="220px">
            {listItems?.items?.length > 3 && (
              <InputGroup
                flex={1}
                width={'full'}
                mb={'3'}
                endElement={
                  <Flex alignItems={'flex-end'} justifyContent={'flex-end'}>
                    <BiSearch color={VariablesColors.grayScale} />
                  </Flex>
                }
              >
                <Input
                  placeholder={t('COMMON.SEARCH')}
                  size="lg"
                  height={'40px'}
                  variant={'outline'}
                  borderColor={'inherit'}
                  borderRadius={'12px'}
                  shadow={'xs'}
                  _placeholder={{ color: 'gray.400' }}
                  fontSize={{ base: '16px', md: '12px' }}
                  _focus={{ borderColor: 'bg.muted' }}
                  disabled={isDisabled}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            )}

            {filteredItems?.length ? (
              filteredItems.map((item: { id: string; label: string; value: string }) => {
                return (
                  <SelectItem
                    key={item.id || item.value}
                    item={item.value}
                    _highlighted={{
                      color: item.value ? 'primary.500' : 'inherit',
                      background: item.value ? 'primary.50' : 'transparent',
                    }}
                    fontSize={{ base: '16px', md: '13px' }}
                  >
                    {item.label}
                  </SelectItem>
                );
              })
            ) : (
              <BaseText fontSize="sm" color="gray.400" px={2} py={1}>
                {t('COMMON.NO_SELECT_OPTIONS')}
              </BaseText>
            )}
          </SelectContent>
        </React.Fragment>
      )}
    </SelectRoot>
  );
};
