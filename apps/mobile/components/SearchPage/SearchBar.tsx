import { FC } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon, MapPinIcon } from "react-native-heroicons/outline";

interface Props {
  query: string;
  setQuery: (val: string) => void;
  showSearch: boolean;
  setShowSearch: (val: boolean) => void;
  onCurrentLocation: () => void;
}

const SearchBar: FC<Props> = ({
  query,
  setQuery,
  showSearch,
  setShowSearch,
  onCurrentLocation,
}) => (
  <View className="mx-4 relative mb-6 flex-row gap-4 items-center space-x-2">
    <View
      style={{
        borderRadius: 50,
        borderWidth: showSearch ? 1 : 0,
        borderColor: showSearch ? "white" : "transparent",
      }}
      className="flex-row items-center flex-1 border-white rounded-full bg-white/10 backdrop-blur-sm"
    >
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="lightgray"
        placeholder="Search cities..."
        className="text-white pl-6 h-12 flex-1 text-base"
        autoFocus
      />

      <TouchableOpacity
        onPress={() => setShowSearch(!showSearch)}
        className="h-14 w-14 rounded-full items-center justify-center bg-cyan-500/30"
      >
        <MagnifyingGlassIcon size={24} color="white" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      onPress={onCurrentLocation}
      className="h-14 w-14 rounded-full items-center justify-center bg-green-500/30"
    >
      <MapPinIcon size={24} color="white" />
    </TouchableOpacity>
  </View>
);

export default SearchBar;
