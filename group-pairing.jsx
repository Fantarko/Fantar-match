import { useState, useEffect, useRef } from "react";

const students = [
  { id: 1, code: "69319100001", name: "นายกวิน อ่อนชัย" },
  { id: 2, code: "69319100002", name: "นางสาวกาญจนา จำปาสอน" },
  { id: 3, code: "69319100003", name: "นางสาวจิตากา คัชฎทัศน์" },
  { id: 4, code: "69319100004", name: "นายชนาชิป บริบูรณ์" },
  { id: 5, code: "69319100005", name: "นายชิตริรัตน์ ขึ้นชม" },
  { id: 6, code: "69319100006", name: "นางสาวญาณิศา นาหมื่น" },
  { id: 7, code: "69319100007", name: "นางสาวญาคา ทุมโคตร" },
  { id: 8, code: "69319100008", name: "นางสาวณคประภา อินพิทักษ์" },
  { id: 9, code: "69319100009", name: "นางสาวณัฏฐณิชา โครดอ่อน" },
  { id: 10, code: "69319100010", name: "นายณัฐพล ศรีสังข์" },
  { id: 11, code: "69319100011", name: "นางสาวต้อนเต็ม เสียวสวาท" },
  { id: 12, code: "69319100012", name: "นางสาวตรีทิพยนิภ เหล่าวงษา" },
  { id: 13, code: "69319100013", name: "นายธนวัฒน์ โสภาศรี" },
  { id: 14, code: "69319100014", name: "นายธนากร นุสีวอ" },
  { id: 15, code: "69319100015", name: "นางสาวธัญชนก นามมนตรี" },
  { id: 16, code: "69319100016", name: "นางสาวธัญญรัตน์ กิ่งพุ่ม" },
  { id: 17, code: "69319100017", name: "นางสาวธิติยา คำวงศ์" },
  { id: 18, code: "69319100018", name: "นางสาวนิลาวรรณ สินธุรักษ์" },
  { id: 19, code: "69319100019", name: "นางสาวปริญญากร เนื่องพัดร" },
  { id: 20, code: "69319100020", name: "นางสาวพชรนันท์ แก่นนาคำ" },
  { id: 21, code: "69319100021", name: "นายพรรณเศรษฐ์ คำพิทูลย์" },
  { id: 22, code: "69319100022", name: "นายพลวัฒน์ ท้าวพา" },
  { id: 23, code: "69319100023", name: "นางสาวพิญดา กมลคร" },
  { id: 24, code: "69319100024", name: "นางสาวพิมลพัชร พันตะเภา" },
  { id: 25, code: "69319100025", name: "นางสาวภัสสร ทุมขะ" },
  { id: 26, code: "69319100026", name: "นายภานุเดช สิทธิศักดิ์" },
  { id: 27, code: "69319100027", name: "นายศภกิทร มากหมุน" },
  { id: 28, code: "69319100028", name: "นายระพีพันธ์ คู่กระสังข์" },
  { id: 29, code: "69319100029", name: "นางสาววิภาตา คณารักษ์" },
  { id: 30, code: "69319100030", name: "นายวีรชัย วรสิทธิ์" },
  { id: 31, code: "69319100031", name: "นางสาวสุมิตรดรา เชื้อบุญมา" },
  { id: 32, code: "69319100032", name: "นายสุรชัย มีปากดี" },
  { id: 33, code: "69319100033", name: "นายอภิชาติ คำตุ" },
  { id: 34, code: "69319100034", name: "นายอรรถภูมิ มนตรีไพรี" },
  { id: 35, code: "69319100035", name: "นายภานุพงศ์ สืบแสนตอ" },
  { id: 36, code: "69319100036", name: "นางสาวศศิญา แกพิน" },
  { id: 37, code: "69319100037", name: "นางสาววริษา เมืองนาง" },
  { id: 38, code: "69319100039", name: "นายอัญฎาวุธ จันทพล" },
  { id: 39, code: "69319100045", name: "นายธิติวัฒน์ คงบุ่งค้า" },
  { id: 40, code: "69319100060", name: "นายสัจจพงศ์ สุทธิสานนท์" },
  { id: 41, code: "69319100061", name: "นางสาวดวงฤดี ชัยหาญ" },
  { id: 42, code: "69319100062", name: "นางสาวหนึ่งฤทัย หงษา" },
  { id: 43, code: "69319100066", name: "นางสาวจุฑามณี นิสีดา" },
  { id: 44, code: "69319100067", name: "นายวรเดช โสภา" },
  { id: 45, code: "69319100067", name: "นางสาวบุณยวีร์ คามเขต" },
];

const COLORS = [
  ["#6366f1", "#8b5cf6"],
  ["#f43f5e", "#fb7185"],
  ["#0ea5e9", "#38bdf8"],
  ["#10b981", "#34d399"],
  ["#f59e0b", "#fbbf24"],
  ["#ec4899", "#f472b6"],
  ["#14b8a6", "#2dd4bf"],
  ["#8b5cf6", "#a78bfa"],
  ["#ef4444", "#f87171"],
  ["#3b82f6", "#60a5fa"],
];

const PREFIXES = ["นางสาว", "นาง", "นาย"];

function getFirstName(name) {
  let stripped = name.trim();
  for (const prefix of PREFIXES) {
    if (stripped.startsWith(prefix)) {
      stripped = stripped.slice(prefix.length).trim();
      break;
    }
  }
  return stripped.split(" ")[0];
}

function getInitials(name) {
  const first = getFirstName(name);
  return first[0] || "?";
}

function Avatar({ name, colorIdx, size = 44 }) {
  const [c1, c2] = COLORS[colorIdx % COLORS.length];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${c1}, ${c2})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
        boxShadow: `0 2px 8px ${c1}55`,
      }}
    >
      {getInitials(name)}
    </div>
  );
}

const STORAGE_KEY = "dbt-group-pairs";

export default function App() {
  const [pairs, setPairsState] = useState({});
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [toast, setToast] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const toastTimer = useRef(null);

  // Load from storage on mount
useEffect(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setPairsState(JSON.parse(saved));
    }
  } catch (err) {
    console.error(err);
  }

  setLoaded(true);
}, []);

  // Save to storage whenever pairs change (after loaded)
const setPairs = (newPairs) => {
  setPairsState(newPairs);

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newPairs)
    );
  } catch (err) {
    console.error(err);
  }
};

const showToast = (msg, type = "success") => {
  setToast({ msg, type });

  if (toastTimer.current) {
    clearTimeout(toastTimer.current);
  }

  toastTimer.current = setTimeout(() => {
    setToast(null);
  }, 2500);
};

  const isPaired = (id) => id in pairs;
  const getPartner = (id) => students.find((s) => s.id === pairs[id]);

  const handleSelect = (student) => {
    if (isPaired(student.id)) {
      
     const partner = getPartner(student.id);

    const newPairs = { ...pairs };

    delete newPairs[student.id];

    if (partner) {
      delete newPairs[partner.id];
}
      setPairs(newPairs);
      showToast(`ยกเลิกการจับคู่ ${getFirstName(student.name)} แล้ว`, "info");
      setSelected(null);
      return;
    }

    if (!selected) {
      setSelected(student.id);
    } else if (selected === student.id) {
      setSelected(null);
    } else {
      if (isPaired(selected)) {
        showToast("คนนี้มีคู่แล้ว", "error");
        setSelected(null);
        return;
      }
      const newPairs = { ...pairs, [selected]: student.id, [student.id]: selected };
      setPairs(newPairs);
      const s1 = students.find((s) => s.id === selected);
      showToast(`จับคู่ ${getFirstName(s1.name)} & ${getFirstName(student.name)} สำเร็จ! 🎉`);
      setSelected(null);
    }
  };

  const clearAll = () => {
  const ok = window.confirm(
    "ต้องการล้างการจับคู่ทั้งหมดใช่หรือไม่?"
  );

  if (!ok) return;

  setPairs({});
  setSelected(null);

  showToast(
    "ล้างการจับคู่ทั้งหมดแล้ว",
    "info"
  );
};

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f0f1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#a5b4fc", fontFamily: "'Sarabun', sans-serif", fontSize: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⏳</div>
          <div>กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  const pairedCount = Object.keys(pairs).length / 2;
  const unpaired = students.filter((s) => !isPaired(s.id));

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search);
    const matchTab = tab === "all" || (tab === "paired" && isPaired(s.id)) || (tab === "unpaired" && !isPaired(s.id));
    return matchSearch && matchTab;
  });

  // Group pairs for display
  const pairGroups = [];
  const seen = new Set();
students.forEach((s) => {
  if (!isPaired(s.id) || seen.has(s.id)) return;

  const partner = getPartner(s.id);

  if (!partner) return;

  pairGroups.push([s, partner]);

  seen.add(s.id);
  seen.add(partner.id);
});

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", color: "#e2e8f0" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 3px; }
        .card { transition: transform 0.18s, box-shadow 0.18s; }
        .card:hover { transform: translateY(-2px); }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .student-card { transition: all 0.2s; cursor: pointer; }
        .student-card:hover { transform: translateY(-2px) scale(1.01); }
        @keyframes slideIn { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: none; } }
        @keyframes toastIn { from { opacity:0; transform: translateX(80px); } to { opacity:1; transform: none; } }
        .pair-badge { animation: slideIn 0.3s ease; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a1a3e 0%, #16213e 50%, #0f3460 100%)", padding: "32px 24px 24px", borderBottom: "1px solid #ffffff11", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, #6366f155 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, left: 40, width: 140, height: 140, background: "radial-gradient(circle, #8b5cf644 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 28 }}>🎓</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, color: "#a5b4fc", textTransform: "uppercase" }}>เทคโนโลยีธุรกิจดิจิทัล</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, background: "linear-gradient(90deg, #e0e7ff, #c7d2fe, #a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                จับคู่ทำงานกลุ่ม
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { label: "นักศึกษาทั้งหมด", value: students.length, icon: "👥", color: "#6366f1" },
              { label: "จับคู่แล้ว", value: `${pairedCount} คู่`, icon: "💞", color: "#10b981" },
              { label: "ยังไม่มีคู่", value: unpaired.length, icon: "⏳", color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ background: "#ffffff0a", borderRadius: 14, padding: "12px 20px", border: `1px solid ${s.color}33`, minWidth: 130 }}>
                <div style={{ fontSize: 18 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {/* Instruction Banner */}
        {selected && (
          <div style={{ background: "linear-gradient(90deg, #6366f122, #8b5cf622)", border: "1px solid #6366f144", borderRadius: 12, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12, animation: "slideIn 0.2s ease" }}>
            <div style={{ fontSize: 22 }}>👆</div>
            <div>
              <div style={{ fontWeight: 600, color: "#a5b4fc" }}>
                เลือก: {students.find((s) => s.id === selected)?.name}
              </div>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>คลิกเพื่อนคนถัดไปเพื่อจับคู่ หรือคลิกคนเดิมเพื่อยกเลิก</div>
            </div>
          </div>
        )}

        {/* Pairs Summary */}
        {pairGroups.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#a5b4fc", marginBottom: 12, letterSpacing: 1 }}>💞 คู่ที่จับแล้ว ({pairGroups.length} คู่)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {pairGroups.map(([a, b], i) => (
                <div key={i} className="pair-badge" style={{ background: `linear-gradient(135deg, ${COLORS[i % COLORS.length][0]}22, ${COLORS[i % COLORS.length][1]}22)`, border: `1px solid ${COLORS[i % COLORS.length][0]}44`, borderRadius: 20, padding: "6px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#e2e8f0" }}>{getFirstName(a.name)}</span>
                  <span style={{ color: COLORS[i % COLORS.length][0] }}>⟷</span>
                  <span style={{ color: "#e2e8f0" }}>{getFirstName(b.name)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 ค้นหาชื่อหรือรหัส..."
            style={{ flex: 1, minWidth: 200, background: "#ffffff0d", border: "1px solid #ffffff22", borderRadius: 10, padding: "10px 16px", color: "#e2e8f0", fontSize: 14, outline: "none" }}
          />
          <div style={{ display: "flex", gap: 4, background: "#ffffff0a", borderRadius: 10, padding: 4 }}>
            {[{ key: "all", label: "ทั้งหมด" }, { key: "paired", label: "มีคู่" }, { key: "unpaired", label: "ยังไม่มี" }].map((t) => (
              <button key={t.key} className="tab-btn" onClick={() => setTab(t.key)} style={{ padding: "8px 14px", borderRadius: 8, fontSize: 13, fontFamily: "inherit", background: tab === t.key ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent", color: tab === t.key ? "#fff" : "#94a3b8", fontWeight: tab === t.key ? 600 : 400 }}>
                {t.label}
              </button>
            ))}
          </div>
          {pairedCount > 0 && (
            <button onClick={clearAll} style={{ padding: "10px 16px", background: "#ef444422", border: "1px solid #ef444444", borderRadius: 10, color: "#f87171", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              🗑 ล้างทั้งหมด
            </button>
          )}
        </div>

        {/* Student Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {filtered.map((student, i) => {
            const isSelected = selected === student.id;
            const paired = isPaired(student.id);
            const partner = paired ? getPartner(student.id) : null;
            const colorIdx = paired ? students.findIndex((s) => s.id === Math.min(student.id, partner?.id)) % COLORS.length : i % COLORS.length;

            return (
              <div
                key={student.id}
                className="student-card"
                onClick={() => handleSelect(student)}
                style={{
                  background: isSelected
                    ? "linear-gradient(135deg, #6366f133, #8b5cf633)"
                    : paired
                    ? `linear-gradient(135deg, ${COLORS[colorIdx][0]}18, ${COLORS[colorIdx][1]}18)`
                    : "#ffffff08",
                  border: isSelected
                    ? "2px solid #8b5cf6"
                    : paired
                    ? `1.5px solid ${COLORS[colorIdx][0]}55`
                    : "1.5px solid #ffffff14",
                  borderRadius: 14,
                  padding: "14px 16px",
                  position: "relative",
                  boxShadow: isSelected ? "0 0 20px #8b5cf655" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={student.name} colorIdx={colorIdx} size={40} />
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: isSelected ? "#c4b5fd" : "#e2e8f0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {getFirstName(student.name)}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>#{student.id.toString().padStart(2, "0")}</div>
                  </div>
                </div>

                {paired && partner && (
                  <div style={{ marginTop: 10, background: "#ffffff08", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <Avatar name={partner.name} colorIdx={colorIdx} size={22} />
                    <span style={{ fontSize: 11, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {getFirstName(partner.name)}
                    </span>
                  </div>
                )}

                {!paired && !isSelected && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#475569" }}>คลิกเพื่อเลือก</div>
                )}

                {isSelected && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#a5b4fc", fontWeight: 600 }}>✓ เลือกอยู่</div>
                )}

                {paired && (
                  <div style={{ position: "absolute", top: 10, right: 10, fontSize: 14 }}>💞</div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#475569" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>ไม่พบรายชื่อที่ค้นหา</div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 32, color: "#334155", fontSize: 12 }}>
          เทคโนโลยีธุรกิจดิจิทัล · ผู้สอน นาย วรุฒ เนื่องชมภู · 4 มิถุนายน 2569
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.type === "error" ? "#ef4444" : toast.type === "info" ? "#3b82f6" : "#10b981", color: "#fff", borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 600, boxShadow: "0 8px 24px #00000055", animation: "toastIn 0.3s ease", zIndex: 999, fontFamily: "inherit" }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
