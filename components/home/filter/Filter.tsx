import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';

import CustomBackdrop from './CustomBackdrop';
import FilterView from './FilterView';

export default function Filter({ bottomSheetModalRef }: { bottomSheetModalRef: React.MutableRefObject<BottomSheetModal | null> }) {
    const { colors } = useTheme();

    return (
        <BottomSheetModal
            index={0}
            snapPoints={['80%']}
            ref={bottomSheetModalRef}
            backdropComponent={(props) => <CustomBackdrop {...props} />}
            backgroundStyle={{ borderRadius: 24, backgroundColor: colors.background }}
            handleIndicatorStyle={{ backgroundColor: colors.primary }}>
            <FilterView />
        </BottomSheetModal>
    );
}
