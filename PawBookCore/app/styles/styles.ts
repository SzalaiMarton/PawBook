import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const shared = StyleSheet.create({
  // ── Layout ──
  flex1: { flex: 1 },
  row:   { flexDirection: "row", alignItems: "center" },
  center:{ alignItems: "center", justifyContent: "center" },

  // ── Scroll container ──
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 24,
  },

  // ── Search bar ──
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.surfaceUp,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: theme.muted,
  },

  // ── Section label ──
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },

  // ── Pill ──
  pill: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "600",
  },

  // ── Cards ──
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
  },

  // ── Park row ──
  parkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: 8,
  },
  parkRowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  parkRowName: { fontWeight: "600", fontSize: 13, color: theme.text },
  parkRowSub:  { fontSize: 11, color: theme.muted },

  // ── Top bar button ──
  topBarBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
    justifyContent: "center",
  },
});

// ── Dashboard ──
export const dashStyles = StyleSheet.create({
  greetingSub:  { fontSize: 13, color: theme.muted, marginBottom: 2 },
  greetingMain: { fontSize: 24, fontWeight: "700", color: theme.text },

  todayCard: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(245,166,35,0.27)",
    backgroundColor: "rgba(245,166,35,0.08)",
  },
  todayLabel: {
    fontSize: 11, fontWeight: "700",
    color: theme.accent, letterSpacing: 1,
    textTransform: "uppercase", marginBottom: 10,
  },
  todayInner: { flexDirection: "row", alignItems: "center", gap: 12 },
  todayIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: theme.accent,
    alignItems: "center", justifyContent: "center",
  },
  todayTitle: { fontWeight: "700", fontSize: 16, color: theme.text },
  todaySub:   { fontSize: 13, color: theme.muted },
  todayTags:  { flexDirection: "row", gap: 8, marginTop: 14, flexWrap: "wrap" },

  statsGrid: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1, borderRadius: 16, padding: 14,
    alignItems: "center",
    backgroundColor: theme.card,
    borderWidth: 1, borderColor: theme.border,
  },
  statValue: { fontWeight: "700", fontSize: 20, color: theme.text },
  statLabel: { fontSize: 10, color: theme.muted, marginTop: 2 },

  nearbyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  nearbyTitle:  { fontWeight: "700", fontSize: 15, color: theme.text },
  nearbyLink:   { fontSize: 12, color: theme.accent },
});

// ── Map ──
export const mapStyles = StyleSheet.create({
  canvas: {
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.border,
    height: 260,
    backgroundColor: "#0d1a0d",
    position: "relative",
  },
  legend: {
    position: "absolute", top: 10, right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 8,
    gap: 4,
  },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText:{ fontSize: 10, color: theme.muted },
  parkList:  { padding: 14, flex: 1 },
  parkMapRow:{
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 14, paddingVertical: 13,
    borderRadius: 16, borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    marginBottom: 8,
  },
  userDot: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: theme.blue,
    shadowColor: theme.blue, shadowOpacity: 0.5,
    shadowRadius: 6, shadowOffset: { width: 0, height: 0 },
  },
});

// ── Friends ──
export const friendStyles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 10, paddingVertical: 12,
    borderRadius: 14, marginBottom: 4,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: theme.surfaceUp,
    alignItems: "center", justifyContent: "center",
  },
  statusDot: {
    position: "absolute", bottom: 1, right: 1,
    width: 10, height: 10, borderRadius: 5,
    borderWidth: 2, borderColor: theme.bg,
  },
  name:     { fontWeight: "600", fontSize: 14, color: theme.text },
  sub:      { fontSize: 12, color: theme.muted },
  goingTag: {
    flexDirection: "row", alignItems: "center", gap: 4,
    marginTop: 4, paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "rgba(245,166,35,0.13)",
    borderWidth: 1, borderColor: "rgba(245,166,35,0.27)",
    alignSelf: "flex-start",
  },
  goingText: { fontSize: 10, color: theme.accent },
  msgBtn: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },
});

// ── Achievements ──
export const achieveStyles = StyleSheet.create({
  hero: {
    borderRadius: 20, padding: 18,
    borderWidth: 1, borderColor: "rgba(245,166,35,0.27)",
    backgroundColor: "#1a1400",
    alignItems: "center", marginBottom: 20,
  },
  heroCount: { fontWeight: "700", fontSize: 22, color: theme.accent },
  heroSub:   { fontSize: 12, color: theme.muted, marginTop: 4 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "47%", borderRadius: 18,
    padding: 16, borderWidth: 1,
  },
  titleEarned: { fontWeight: "700", fontSize: 13, color: theme.accent, marginBottom: 4 },
  titleLocked: { fontWeight: "700", fontSize: 13, color: theme.text,   marginBottom: 4 },
  desc:        { fontSize: 11, color: theme.muted, marginBottom: 10, lineHeight: 16 },
  track:       { height: 4, borderRadius: 2, backgroundColor: theme.surfaceUp, overflow: "hidden" },
  fillEarned:  { height: 4, borderRadius: 2, backgroundColor: theme.accent },
  fillLocked:  { height: 4, borderRadius: 2, backgroundColor: theme.blue },
  progressLabel:{ fontSize: 10, color: theme.muted, marginTop: 5, textAlign: "right" },
});

// ── Feed ──
export const feedStyles = StyleSheet.create({
  filters:    { flexDirection: "row", gap: 8, marginBottom: 16},
  filterPill: {
    paddingHorizontal: 14, paddingVertical: 6, marginRight: 5,
    borderRadius: 20, borderWidth: 1, borderColor: theme.border,
    backgroundColor: theme.surfaceUp,
  },
  filterPillActive: {
    paddingHorizontal: 14, paddingVertical: 6, marginRight: 5,
    borderRadius: 20, borderWidth: 1, borderColor: "transparent",
    backgroundColor: theme.accent,
  },
  filterText:       { fontSize: 12, fontWeight: "600", color: theme.muted },
  filterTextActive: { fontSize: 12, fontWeight: "600", color: "#000" },
  card: {
    borderRadius: 18, borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    marginBottom: 12, overflow: "hidden",
  },
  cardBody:   { padding: 14 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  avatar:     { width: 40, height: 40, borderRadius: 12, backgroundColor: theme.surfaceUp, alignItems: "center", justifyContent: "center" },
  userName:   { fontWeight: "700", fontSize: 13, color: theme.text },
  userDog:    { fontSize: 11, color: theme.muted },
  time:       { fontSize: 11, color: theme.muted, marginLeft: "auto" },
  text:       { fontSize: 13, color: theme.muted, lineHeight: 20 },
  textBold:   { fontWeight: "600", color: theme.text },
  textAccent: { fontWeight: "600", color: theme.accent },
  imgPlaceholder: {
    marginTop: 12, height: 110, borderRadius: 12,
    backgroundColor: "#1a2a1a", alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: theme.border,
  },
  actions:    { flexDirection: "row", gap: 16, marginTop: 12, alignItems: "center" },
  actionBtn:  { flexDirection: "row", alignItems: "center", gap: 5 },
  actionText: { fontSize: 13, color: theme.muted },
  actionLiked:{ fontSize: 13, color: theme.accent },
});

// ── Overlays ──
export const overlayStyles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  // Menu
  menuPanel: {
    position: "absolute", top: 0, left: 0, bottom: 0,
    width: "70%",
    backgroundColor: theme.surface,
    borderRightWidth: 1, borderRightColor: theme.border,
    paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40,
  },
  menuProfileCard: {
    flexDirection: "row", alignItems: "center", gap: 14,
    padding: 16, borderRadius: 16,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    marginBottom: 28,
  },
  menuProfileAvatar: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: theme.accent,
    alignItems: "center", justifyContent: "center",
  },
  menuProfileName: { fontWeight: "700", color: theme.text, fontSize: 15 },
  menuProfileSub:  { fontSize: 12, color: theme.muted },
  menuItem: {
    flexDirection: "row", alignItems: "center", gap: 14,
    paddingHorizontal: 14, paddingVertical: 13,
    marginBottom: 2, borderRadius: 12,
  },
  menuItemText:   { fontSize: 14, fontWeight: "500", color: theme.text },
  menuItemDanger: { fontSize: 14, fontWeight: "500", color: theme.red },
  menuDivider:    { height: 1, backgroundColor: theme.border, marginVertical: 8 },
  menuFooter:     { marginTop: "auto", fontSize: 11, color: theme.muted, textAlign: "center" },
  // Chat
  chatPanel: {
    position: "absolute", top: 0, right: 0, bottom: 0,
    width: "70%",
    backgroundColor: theme.surface,
    borderLeftWidth: 1, borderLeftColor: theme.border,
  },
  chatHeader: {
    paddingTop: 54, paddingHorizontal: 20, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: theme.border,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  chatTitle:   { fontWeight: "700", fontSize: 18, color: theme.text },
  chatCloseBtn:{
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },
  chatRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 10, paddingVertical: 12,
    borderRadius: 14, marginBottom: 4,
  },
  chatAvatar: {
    width: 46, height: 46, borderRadius: 14,
    backgroundColor: theme.surfaceUp,
    alignItems: "center", justifyContent: "center",
  },
  chatName:   { fontWeight: "600", fontSize: 14, color: theme.text },
  chatTime:   { fontSize: 11, color: theme.muted },
  chatLast:   { fontSize: 12, color: theme.muted },
  chatBadge:  {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: theme.accent,
    alignItems: "center", justifyContent: "center",
  },
  chatBadgeText: { fontSize: 10, fontWeight: "700", color: "#000" },
  chatSearchWrap: { padding: 16, paddingBottom: 28, borderTopWidth: 1, borderTopColor: theme.border },
});

// ── Chat Screen ──
export const chatScreenStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },
  headerAvatar: {
    width: 40, height: 40, borderRadius: 13,
    backgroundColor: theme.surfaceUp,
    alignItems: "center", justifyContent: "center",
  },
  headerName:   { fontWeight: "700", fontSize: 15, color: theme.text },
  headerSub:    { fontSize: 11, color: theme.muted },
  headerOnline: { fontSize: 11, color: theme.green },
  headerRight:  { marginLeft: "auto", flexDirection: "row", gap: 8 },
  headerIconBtn:{
    width: 36, height: 36, borderRadius: 11,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },

  // Messages list
  messagesList: { flex: 1 },
  messagesContent: { padding: 16, gap: 8 },

  // Date divider
  dateDivider: {
    alignItems: "center",
    marginVertical: 8,
  },
  dateDividerText: {
    fontSize: 11, color: theme.muted,
    backgroundColor: theme.surfaceUp,
    paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },

  // Bubble row
  bubbleRow:     { flexDirection: "row", alignItems: "flex-end", gap: 8, marginBottom: 4 },
  bubbleRowMe:   { flexDirection: "row-reverse", alignItems: "flex-end", gap: 8, marginBottom: 4 },
  bubbleAvatar:  {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: theme.surfaceUp,
    alignItems: "center", justifyContent: "center",
    marginBottom: 2,
  },

  // Bubbles
  bubbleThem: {
    maxWidth: "72%",
    backgroundColor: theme.surfaceUp,
    borderRadius: 18, borderBottomLeftRadius: 5,
    paddingHorizontal: 14, paddingVertical: 10,
    borderWidth: 1, borderColor: theme.border,
  },
  bubbleMe: {
    maxWidth: "72%",
    backgroundColor: theme.accent,
    borderRadius: 18, borderBottomRightRadius: 5,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  bubbleTextThem: { fontSize: 14, color: theme.text, lineHeight: 20 },
  bubbleTextMe:   { fontSize: 14, color: "#000",     lineHeight: 20 },
  bubbleTime:     { fontSize: 10, color: theme.muted, marginTop: 3, alignSelf: "flex-end" },
  bubbleTimeMe:   { fontSize: 10, color: "rgba(0,0,0,0.45)", marginTop: 3, alignSelf: "flex-end" },

  // Input bar
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: theme.surfaceUp,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 44,
    justifyContent: "center",
  },
  inputText: { fontSize: 14, color: theme.text },
  inputPlaceholder: { fontSize: 14, color: theme.muted },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: theme.accent,
    alignItems: "center", justifyContent: "center",
  },
  sendBtnDisabled: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },

  // Park invite card inside chat
  parkCard: {
    backgroundColor: theme.card,
    borderRadius: 16, borderWidth: 1, borderColor: theme.border,
    padding: 14, marginBottom: 8,
  },
  parkCardLabel: { fontSize: 10, color: theme.accent, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 },
  parkCardRow:   { flexDirection: "row", alignItems: "center", gap: 10 },
  parkCardIcon:  { width: 40, height: 40, borderRadius: 12, backgroundColor: theme.accentSoft, alignItems: "center", justifyContent: "center" },
  parkCardName:  { fontWeight: "600", fontSize: 13, color: theme.text },
  parkCardSub:   { fontSize: 11, color: theme.muted },
  parkCardBtn:   { marginTop: 10, backgroundColor: theme.accent, borderRadius: 12, paddingVertical: 8, alignItems: "center" },
  parkCardBtnText:       { fontWeight: "700", fontSize: 13, color: "#000" },
  parkCardBtnJoined:     { backgroundColor: theme.greenSoft, borderWidth: 1, borderColor: theme.green + "66" },
  parkCardBtnTextJoined: { fontWeight: "700", fontSize: 13, color: theme.green },
});

export const topBarStyles = StyleSheet.create({
  bar: {
    height: 56, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: theme.bg,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  logoText: { fontWeight: "700", fontSize: 20, color: theme.text, letterSpacing: -0.5 },
  line:     { height: 2, backgroundColor: theme.text, borderRadius: 2 },
  chatBadge:{
    position: "absolute", top: 6, right: 6,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: theme.accent,
    borderWidth: 2, borderColor: theme.bg,
  },
});

export const navStyles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    height: 72,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1, height: 56,
    alignItems: "center", justifyContent: "center",
    gap: 3, borderRadius: 14,
  },
  tabActive: { backgroundColor: "rgba(245,166,35,0.13)" },
  mapTab:    { flex: 1.4, alignItems: "center", justifyContent: "center", gap: 3 },
  mapIconWrap: {
    width: 50, height: 50, borderRadius: 16,
    backgroundColor: theme.surfaceUp,
    borderWidth: 1.5, borderColor: theme.border,
    alignItems: "center", justifyContent: "center",
  },
  mapIconWrapActive: {
    backgroundColor: "rgba(245,166,35,0.18)",
    borderColor: "rgba(245,166,35,0.5)",
    transform: [{ translateY: -4 }],
    shadowColor: theme.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  mapIcon:   { fontSize: 30 },
  icon:      { fontSize: 24, color: theme.muted },
  iconActive:{ color: theme.accent },
  label:     { fontSize: 11, fontWeight: "600", letterSpacing: 0.3, color: theme.muted },
  labelActive: { color: theme.accent },
});