import { Flex, SimpleGrid } from '@chakra-ui/react';
import { BaseStats, TextWeight } from '_components/custom';
import { MODELS } from '_types/*';
import { CLASS_GRADE_CYCLE } from '../../../../types/constants';

export const ClassStatsCard = ({
  data,
  isLoading,
}: {
  data: MODELS.IClass[];
  isLoading?: boolean;
}) => {
  if (!data) return null;

  function groupedByCycle() {
    const grouped = data?.reduce(
      (acc, classe) => {
        const cycle = classe.niveau.cycle;

        if (!acc[cycle]) {
          acc[cycle] = {
            cycle: classe.niveau.cycle,
            nombreClasses: 0,
            classes: [],
          };
        }

        acc[cycle].nombreClasses++;
        acc[cycle].classes.push(classe.niveau.nom);

        return acc;
      },
      {} as Record<
        string,
        {
          cycle: string;
          nombreClasses: number;
          classes: string[];
        }
      >,
    );

    return Object.values(grouped).map((item) => ({
      cycle: item.cycle,
      nombreClasses: item.nombreClasses,
      classes: item.classes.join(', '),
    }));
  }

  const stats = groupedByCycle().map((v, i) => ({
    label: CLASS_GRADE_CYCLE.find((g) => v.cycle === g.value)?.label,
    message: v?.nombreClasses,
    value: v?.classes,
    color: ['primary.500', 'secondary.500', 'success.500', 'orange.500'][i],
  }));

  return (
    <Flex width={'full'} gap={4}>
      <SimpleGrid width={'full'} mt={'40px'} columns={{ base: 1, sm: 4 }} gap={4}>
        {stats.map((s, i) => (
          <BaseStats
            key={i}
            iconBgColor={s.color}
            title={s.label ?? ''}
            value={(s.value as unknown as number) || 'Aucune classe'}
            message={(s.message as unknown as string) || '0'}
            isLoading={isLoading}
            valueFontSize={'sm'}
            titleWeight={TextWeight.Regular}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
