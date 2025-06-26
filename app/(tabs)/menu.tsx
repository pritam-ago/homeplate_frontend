"use client"

import { useState, useCallback } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Switch,
    StyleSheet,
    SafeAreaView,
    Modal,
} from "react-native"

// Define proper types
interface MenuItem {
    name: string
    count: number
}

interface ManageableItem {
    name: string
    price: string
    checked: boolean
}

interface MenuState {
    morning: MenuItem[]
    afternoon: MenuItem[]
    night: MenuItem[]
}

interface ActiveState {
    morning: boolean
    afternoon: boolean
    night: boolean
}

interface ShowDeleteState {
    morning: boolean
    afternoon: boolean
    night: boolean
}

interface CheckedState {
    morning: number[]
    afternoon: number[]
    night: number[]
}

interface AddingState {
    morning: boolean
    afternoon: boolean
    night: boolean
}

interface NewItemState {
    morning: string
    afternoon: string
    night: string
}

type ColumnKey = "morning" | "afternoon" | "night"

const initialMenu: MenuState = {
    morning: [
        { name: "Idli", count: 0 },
        { name: "Dosa", count: 0 },
        { name: "Vada", count: 0 },
    ],
    afternoon: [
        { name: "Rice", count: 0 },
        { name: "Sambar", count: 0 },
        { name: "Poriyal", count: 0 },
    ],
    night: [
        { name: "Chapati", count: 0 },
        { name: "Paneer", count: 0 },
        { name: "Curd Rice", count: 0 },
    ],
}

const initialManageableItems: ManageableItem[] = [
    { name: "Pizza", price: "10", checked: false },
    { name: "Burger", price: "5", checked: false },
    { name: "Pasta", price: "8", checked: false },
]

const columns: Array<{ key: ColumnKey; label: string }> = [
    { key: "morning", label: "MORNING" },
    { key: "afternoon", label: "AFTERNOON" },
    { key: "night", label: "NIGHT" },
]

export default function Menu() {
    const [activeTab, setActiveTab] = useState<"today" | "manage">("today")
    const [menu, setMenu] = useState<MenuState>(initialMenu)
    const [active, setActive] = useState<ActiveState>({ morning: true, afternoon: true, night: true })
    const [showDelete, setShowDelete] = useState<ShowDeleteState>({ morning: false, afternoon: false, night: false })
    const [checked, setChecked] = useState<CheckedState>({ morning: [], afternoon: [], night: [] })
    const [adding, setAdding] = useState<AddingState>({ morning: false, afternoon: false, night: false })
    const [newItem, setNewItem] = useState<NewItemState>({ morning: "", afternoon: "", night: "" })

    // State for Manage Items
    const [manageableItems, setManageableItems] = useState<ManageableItem[]>(initialManageableItems)
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [newItemName, setNewItemName] = useState<string>("")
    const [newItemPrice, setNewItemPrice] = useState<string>("")
    const [expandedItem, setExpandedItem] = useState<number | null>(null)
    const [editingItem, setEditingItem] = useState<number | null>(null)
    const [editingName, setEditingName] = useState<string>("")
    const [editingPrice, setEditingPrice] = useState<string>("")

    // TODAY'S MENU FUNCTIONS
    const handleToggleActive = useCallback((col: ColumnKey) => {
        setActive((prev) => ({ ...prev, [col]: !prev[col] }))
    }, [])

    const handleDeleteClick = useCallback((col: ColumnKey) => {
        setShowDelete((prev) => ({ ...prev, [col]: !prev[col] }))
        setChecked((prev) => ({ ...prev, [col]: [] }))
    }, [])

    const handleCheck = useCallback((col: ColumnKey, idx: number) => {
        setChecked((prev) => {
            const arr = prev[col].includes(idx) ? prev[col].filter((i) => i !== idx) : [...prev[col], idx]
            return { ...prev, [col]: arr }
        })
    }, [])

    const handleConfirmDelete = useCallback(
        (col: ColumnKey) => {
            setMenu((prev) => ({
                ...prev,
                [col]: prev[col].filter((_, idx) => !checked[col].includes(idx)),
            }))
            setChecked((prev) => ({ ...prev, [col]: [] }))
            setShowDelete((prev) => ({ ...prev, [col]: false }))
        },
        [checked],
    )

    const handleAddClick = useCallback((col: ColumnKey) => {
        setAdding((prev) => ({ ...prev, [col]: true }))
    }, [])

    const handleAddItem = useCallback(
        (col: ColumnKey) => {
            if (newItem[col].trim()) {
                setMenu((prev) => ({ ...prev, [col]: [...prev[col], { name: newItem[col].trim(), count: 0 }] }))
                setNewItem((prev) => ({ ...prev, [col]: "" }))
                setAdding((prev) => ({ ...prev, [col]: false }))
            }
        },
        [newItem],
    )

    const handleCountChange = useCallback((col: ColumnKey, idx: number, delta: number) => {
        setMenu((prev) => {
            const newColItems = [...prev[col]]
            const newCount = newColItems[idx].count + delta
            if (newCount >= 0) {
                newColItems[idx] = { ...newColItems[idx], count: newCount }
            }
            return { ...prev, [col]: newColItems }
        })
    }, [])

    // MANAGE ITEMS FUNCTIONS
    const handleToggleCheck = useCallback((index: number) => {
        setManageableItems((prev) => {
            const newItems = [...prev]
            newItems[index] = { ...newItems[index], checked: !newItems[index].checked }
            return newItems
        })
    }, [])

    const handleAddNewItem = useCallback(() => {
        if (newItemName.trim() && newItemPrice.trim()) {
            const newItem: ManageableItem = {
                name: newItemName.trim(),
                price: newItemPrice.trim(),
                checked: false,
            }
            setManageableItems((prev) => [...prev, newItem])
            setNewItemName("")
            setNewItemPrice("")
            setModalVisible(false)
        }
    }, [newItemName, newItemPrice])

    const toggleExpand = useCallback(
        (index: number) => {
            if (expandedItem === index) {
                setExpandedItem(null)
                setEditingItem(null)
                setEditingName("")
                setEditingPrice("")
            } else {
                setExpandedItem(index)
                setEditingItem(null)
            }
        },
        [expandedItem],
    )

    const startEditing = useCallback(
        (index: number) => {
            setEditingItem(index)
            setEditingName(manageableItems[index].name)
            setEditingPrice(manageableItems[index].price)
        },
        [manageableItems],
    )

    const cancelEditing = useCallback(() => {
        setEditingItem(null)
        setEditingName("")
        setEditingPrice("")
    }, [])

    // FIXED UPDATE FUNCTION
    const handleUpdateItem = useCallback(
        (index: number) => {
            if (!editingName.trim() || !editingPrice.trim()) {
                alert("Please fill in both name and price")
                return
            }

            setManageableItems((prev) => {
                const updated = [...prev]
                updated[index] = {
                    ...updated[index],
                    name: editingName.trim(),
                    price: editingPrice.trim(),
                }
                return updated
            })

            setExpandedItem(null)
            setEditingItem(null)
            setEditingName("")
            setEditingPrice("")

            alert(`Updated ${editingName} with price $${editingPrice}!`)
        },
        [editingName, editingPrice],
    )

    const handleRemoveItem = useCallback((index: number) => {
        setManageableItems((prev) => prev.filter((_, idx) => idx !== index))
        setExpandedItem(null)
        setEditingItem(null)
        setEditingName("")
        setEditingPrice("")
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{"CHEF'S MENU"}</Text>
            </View>

            <View style={styles.container}>
                {activeTab === "manage" ? (
                    /* MANAGE ITEMS VIEW */
                    <View style={styles.menuOuterBox}>
                        <ScrollView style={styles.manageItemsContainer}>
                            {manageableItems.map((item, index) => (
                                <View key={`${item.name}-${index}`}>
                                    <TouchableOpacity style={styles.manageItemRow} onPress={() => toggleExpand(index)}>
                                        <TouchableOpacity onPress={() => handleToggleCheck(index)} style={styles.manageCheckbox}>
                                            <View style={[styles.manageCheckboxInner, item.checked && styles.manageCheckboxChecked]} />
                                        </TouchableOpacity>
                                        <Text style={styles.manageItemName}>{item.name}</Text>
                                        <Text style={styles.manageItemPrice}>${item.price}</Text>
                                    </TouchableOpacity>

                                    {expandedItem === index && (
                                        <View style={styles.expandedView}>
                                            {editingItem === index ? (
                                                /* EDITING MODE */
                                                <View style={styles.expandedContent}>
                                                    <View style={styles.imagePreview}>
                                                        <Text style={styles.placeholderText}>Image</Text>
                                                    </View>
                                                    <View style={styles.editSection}>
                                                        <TextInput
                                                            style={styles.editInput}
                                                            value={editingName}
                                                            onChangeText={setEditingName}
                                                            placeholder="Food Name"
                                                        />
                                                        <TextInput
                                                            style={styles.editInput}
                                                            value={editingPrice}
                                                            onChangeText={setEditingPrice}
                                                            placeholder="Price"
                                                            keyboardType="numeric"
                                                        />
                                                        <View style={styles.buttonRow}>
                                                            <TouchableOpacity
                                                                style={[styles.actionButton, styles.saveButton]}
                                                                onPress={() => handleUpdateItem(index)}
                                                            >
                                                                <Text style={styles.actionButtonText}>SAVE</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={[styles.actionButton, styles.cancelButton]}
                                                                onPress={cancelEditing}
                                                            >
                                                                <Text style={styles.actionButtonText}>CANCEL</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            ) : (
                                                /* VIEW MODE */
                                                <View style={styles.viewContent}>
                                                    <View style={styles.itemInfo}>
                                                        <View style={styles.imagePreview}>
                                                            <Text style={styles.placeholderText}>Image</Text>
                                                        </View>
                                                        <View style={styles.itemDetails}>
                                                            <Text style={styles.itemNameLarge}>{item.name}</Text>
                                                            <Text style={styles.itemPriceLarge}>${item.price}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.buttonRow}>
                                                        <TouchableOpacity
                                                            style={[styles.actionButton, styles.updateButton]}
                                                            onPress={() => startEditing(index)}
                                                        >
                                                            <Text style={styles.actionButtonText}>UPDATE</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={[styles.actionButton, styles.removeButton]}
                                                            onPress={() => handleRemoveItem(index)}
                                                        >
                                                            <Text style={styles.actionButtonText}>REMOVE</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            )}
                                        </View>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.addItemButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.addItemButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    /* TODAY'S MENU VIEW */
                    <View style={styles.menuOuterBox}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.menuScroll}
                            contentContainerStyle={{ paddingHorizontal: 18, paddingVertical: 18 }}
                        >
                            {columns.map((col) => (
                                <View key={col.key} style={styles.menuColumn}>
                                    <View style={styles.menuColumnHeader}>
                                        <Text style={styles.menuColumnTitle}>{col.label}</Text>
                                        <View style={styles.activeRow}>
                                            <Switch
                                                value={active[col.key]}
                                                onValueChange={() => handleToggleActive(col.key)}
                                                trackColor={{ false: "#ff4d4d", true: "#4cd137" }}
                                                thumbColor={active[col.key] ? "#fff" : "#fff"}
                                            />
                                            <Text style={[styles.activeText, { color: active[col.key] ? "#4cd137" : "#ff4d4d" }]}>
                                                Active
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.menuItemsBox}>
                                        {menu[col.key].map((item, idx) => (
                                            <View key={`${col.key}-${item.name}-${idx}`} style={styles.menuItemRow}>
                                                {showDelete[col.key] && (
                                                    <TouchableOpacity style={styles.checkbox} onPress={() => handleCheck(col.key, idx)}>
                                                        <View
                                                            style={[styles.checkboxBox, checked[col.key].includes(idx) && styles.checkboxChecked]}
                                                        />
                                                    </TouchableOpacity>
                                                )}
                                                <Text style={styles.menuItemText}>{item.name}</Text>
                                                {!showDelete[col.key] && (
                                                    <View style={styles.counterContainer}>
                                                        <TouchableOpacity
                                                            onPress={() => handleCountChange(col.key, idx, -1)}
                                                            style={styles.counterButton}
                                                        >
                                                            <Text style={styles.counterButtonText}>-</Text>
                                                        </TouchableOpacity>
                                                        <Text style={styles.counterValue}>{item.count}</Text>
                                                        <TouchableOpacity
                                                            onPress={() => handleCountChange(col.key, idx, 1)}
                                                            style={styles.counterButton}
                                                        >
                                                            <Text style={styles.counterButtonText}>+</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </View>
                                        ))}
                                        {adding[col.key] && (
                                            <View style={styles.addRow}>
                                                <TextInput
                                                    style={styles.addInput}
                                                    value={newItem[col.key]}
                                                    onChangeText={(text) => setNewItem((prev) => ({ ...prev, [col.key]: text }))}
                                                    placeholder="Enter name"
                                                    onSubmitEditing={() => handleAddItem(col.key)}
                                                    returnKeyType="done"
                                                    autoFocus
                                                />
                                                <TouchableOpacity style={styles.addConfirmBtn} onPress={() => handleAddItem(col.key)}>
                                                    <Text style={styles.addConfirmText}>Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                    <View style={styles.menuColumnFooter}>
                                        {showDelete[col.key] ? (
                                            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleConfirmDelete(col.key)}>
                                                <Text style={styles.deleteBtnText}>DELETE</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeleteClick(col.key)}>
                                                <Text style={styles.deleteBtnText}>DELETE</Text>
                                            </TouchableOpacity>
                                        )}
                                        {!showDelete[col.key] && (
                                            <TouchableOpacity style={styles.addBtn} onPress={() => handleAddClick(col.key)}>
                                                <Text style={styles.addBtnText}>+ ADD</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Sub Tab Bar */}
                <View style={styles.subTabBar}>
                    <TouchableOpacity
                        style={[styles.subTab, activeTab === "manage" && styles.subTabActive]}
                        onPress={() => setActiveTab("manage")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.subTabText, activeTab === "manage" && styles.subTabTextActive]}>MANAGE ITEMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.subTab, activeTab === "today" && styles.subTabActive]}
                        onPress={() => setActiveTab("today")}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.subTabText, activeTab === "today" && styles.subTabTextActive]}>{"TODAY'S MENU"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Add New Item</Text>
                        <TextInput
                            placeholder="Food Name"
                            style={styles.modalInput}
                            value={newItemName}
                            onChangeText={setNewItemName}
                        />
                        <TextInput
                            placeholder="Price"
                            style={styles.modalInput}
                            value={newItemPrice}
                            onChangeText={setNewItemPrice}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtonRow}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleAddNewItem}>
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalCancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    header: {
        alignItems: "center",
        paddingVertical: 18,
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 1,
        marginTop: 8,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "#fff",
    },
    subTabBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 24,
        backgroundColor: "#f2f2f2",
        borderRadius: 18,
        padding: 4,
        marginBottom: 10,
    },
    subTab: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 14,
    },
    subTabActive: {
        backgroundColor: "#3a3532",
    },
    subTabText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3a3532",
    },
    subTabTextActive: {
        color: "#fff",
    },
    menuScroll: {
        flexGrow: 0,
        marginTop: 8,
        marginBottom: 8,
    },
    menuOuterBox: {
        backgroundColor: "#696969",
        borderRadius: 32,
        marginHorizontal: 18,
        marginTop: 18,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "flex-start",
        flex: 1,
        marginBottom: 10,
    },
    menuColumn: {
        backgroundColor: "#D3D3D3",
        borderRadius: 24,
        padding: 15,
        marginRight: 18,
        width: 240,
        minHeight: 420,
        justifyContent: "space-between",
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    menuColumnHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    menuColumnTitle: {
        fontWeight: "bold",
        fontSize: 14,
        letterSpacing: 1,
        flexShrink: 1,
    },
    activeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    activeText: {
        fontWeight: "bold",
        marginLeft: 4,
    },
    menuItemsBox: {
        flex: 1,
        marginVertical: 16,
        gap: 16,
    },
    menuItemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#bfbfbf",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 0,
        marginTop: 0,
    },
    menuItemText: {
        fontSize: 15,
        color: "#222",
        fontWeight: "500",
        flex: 1,
    },
    checkbox: {
        marginRight: 6,
    },
    checkboxBox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#333",
        backgroundColor: "#fff",
    },
    checkboxChecked: {
        backgroundColor: "#333",
    },
    counterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    counterButton: {
        backgroundColor: "#a9a9a9",
        borderRadius: 15,
        width: 24,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    counterButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 20,
    },
    counterValue: {
        fontSize: 16,
        fontWeight: "bold",
        minWidth: 20,
        textAlign: "center",
    },
    addRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    addInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        fontSize: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8,
    },
    addConfirmBtn: {
        backgroundColor: "#3a3532",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 7,
    },
    addConfirmText: {
        color: "#fff",
        fontWeight: "bold",
    },
    menuColumnFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    deleteBtn: {
        backgroundColor: "#ff4d4d",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        marginRight: 6,
    },
    deleteBtnText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    },
    addBtn: {
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    addBtnText: {
        color: "#3a3532",
        fontWeight: "bold",
        fontSize: 15,
    },
    manageItemsContainer: {
        backgroundColor: "#8c8c8c",
        borderRadius: 24,
        padding: 20,
        flex: 1,
    },
    manageItemRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#d4d4d4",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 12,
    },
    manageCheckbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#4a4a4a",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    manageCheckboxInner: {
        width: 14,
        height: 14,
        backgroundColor: "transparent",
    },
    manageCheckboxChecked: {
        backgroundColor: "#4a4a4a",
    },
    manageItemName: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    manageItemPrice: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    addItemButton: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#3a3532",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    addItemButtonText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 32,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },
    modalInput: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtonRow: {
        flexDirection: "row",
        gap: 10,
    },
    modalButton: {
        backgroundColor: "#3a3532",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        minWidth: 100,
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalCancelButton: {
        backgroundColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        minWidth: 100,
    },
    modalCancelButtonText: {
        color: "#333",
        fontWeight: "bold",
        textAlign: "center",
    },
    expandedView: {
        backgroundColor: "#a3a3a3",
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginTop: -12,
        paddingTop: 12,
    },
    expandedContent: {
        flexDirection: "row",
        padding: 15,
        gap: 15,
    },
    viewContent: {
        padding: 15,
    },
    itemInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        marginBottom: 15,
    },
    itemDetails: {
        flex: 1,
        alignItems: "center",
    },
    itemNameLarge: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    itemPriceLarge: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    imagePreview: {
        width: 80,
        height: 80,
        backgroundColor: "#8c8c8c",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    placeholderText: {
        color: "#fff",
        fontSize: 12,
    },
    editSection: {
        flex: 1,
    },
    editInput: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 8,
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    actionButton: {
        flex: 1,
        borderRadius: 6,
        paddingVertical: 8,
        alignItems: "center",
    },
    updateButton: {
        backgroundColor: "#2563eb",
    },
    saveButton: {
        backgroundColor: "#16a34a",
    },
    cancelButton: {
        backgroundColor: "#6b7280",
    },
    removeButton: {
        backgroundColor: "#dc2626",
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
})

