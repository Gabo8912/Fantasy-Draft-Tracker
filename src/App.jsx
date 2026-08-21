import React, { useState, useMemo, useEffect } from "react";
import { Check, Undo2, Flag, Users, Search, Trophy, Radio } from "lucide-react";

// ---------------------------------------------------------------------------
// Player pool — ranking pre-draft ESPN 2026, Fantasy Putitos
// ---------------------------------------------------------------------------
const PLAYERS = [
  [1,"Jahmyr Gibbs","RB","DET"],[2,"Bijan Robinson","RB","ATL"],[3,"Ja'Marr Chase","WR","CIN"],
  [4,"Puka Nacua","WR","LAR"],[5,"Christian McCaffrey","RB","SF"],[6,"Jaxon Smith-Njigba","WR","SEA"],
  [7,"Amon-Ra St. Brown","WR","DET"],[8,"Jonathan Taylor","RB","IND"],[9,"De'Von Achane","RB","MIA"],
  [10,"Justin Jefferson","WR","MIN"],[11,"CeeDee Lamb","WR","DAL"],[12,"Drake London","WR","ATL"],
  [13,"James Cook III","RB","BUF"],[14,"Ashton Jeanty","RB","LV"],[15,"A.J. Brown","WR","NE"],
  [16,"Chase Brown","RB","CIN"],[17,"Omarion Hampton","RB","LAC"],[18,"Nico Collins","WR","HOU"],
  [19,"Derrick Henry","RB","BAL"],[20,"Saquon Barkley","RB","PHI"],[21,"George Pickens","WR","DAL"],
  [22,"Chris Olave","WR","NO"],[23,"Kenneth Walker III","RB","KC"],[24,"Jeremiyah Love","RB","ARI"],
  [25,"Rashee Rice","WR","KC"],[26,"Josh Jacobs","RB","GB"],[27,"Zay Flowers","WR","BAL"],
  [28,"Tee Higgins","WR","CIN"],[29,"Breece Hall","RB","NYJ"],[30,"Garrett Wilson","WR","NYJ"],
  [31,"DeVonta Smith","WR","PHI"],[32,"Trey McBride","TE","ARI"],[33,"Ladd McConkey","WR","LAC"],
  [34,"Tetairoa McMillan","WR","CAR"],[35,"Javonte Williams","RB","DAL"],[36,"Kyren Williams","RB","LAR"],
  [37,"Brock Bowers","TE","LV"],[38,"Terry McLaurin","WR","WSH"],[39,"Cam Skattebo","RB","NYG"],
  [40,"Travis Etienne Jr.","RB","NO"],[41,"Emeka Egbuka","WR","TB"],[42,"Bucky Irving","RB","TB"],
  [43,"Jaylen Waddle","WR","DEN"],[44,"Quinshon Judkins","RB","CLE"],[45,"Davante Adams","WR","LAR"],
  [46,"D'Andre Swift","RB","CHI"],[47,"Luther Burden III","WR","CHI"],[48,"Mike Evans","WR","SF"],
  [49,"Colston Loveland","TE","CHI"],[50,"Jameson Williams","WR","DET"],[51,"Rome Odunze","WR","CHI"],
  [52,"TreVeyon Henderson","RB","NE"],[53,"David Montgomery","RB","HOU"],[54,"DK Metcalf","WR","PIT"],
  [55,"Tyler Warren","TE","IND"],[56,"Malik Nabers","WR","NYG"],[57,"Carnell Tate","WR","TEN"],
  [58,"Bhayshul Tuten","RB","JAX"],[59,"Christian Watson","WR","GB"],[60,"Jadarian Price","RB","SEA"],
  [61,"Alec Pierce","WR","IND"],[62,"Marvin Harrison Jr.","WR","ARI"],[63,"Jaylen Warren","RB","PIT"],
  [64,"Michael Pittman Jr.","WR","PIT"],[65,"Harold Fannin Jr.","TE","CLE"],[66,"DJ Moore","WR","BUF"],
  [67,"Tony Pollard","RB","TEN"],[68,"Sam LaPorta","TE","DET"],[69,"Josh Allen","QB","BUF"],
  [70,"Rhamondre Stevenson","RB","NE"],[71,"Courtland Sutton","WR","DEN"],[72,"Jordyn Tyson","WR","NO"],
  [73,"Rico Dowdle","RB","PIT"],[74,"Chris Godwin Jr.","WR","TB"],[75,"Chuba Hubbard","RB","CAR"],
  [76,"Parker Washington","WR","JAX"],[77,"Brian Thomas Jr.","WR","JAX"],[78,"Michael Wilson","WR","ARI"],
  [79,"Josh Downs","WR","IND"],[80,"Kyle Pitts Sr.","TE","ATL"],[81,"Jalen Hurts","QB","PHI"],
  [82,"Lamar Jackson","QB","BAL"],[83,"Jayden Daniels","QB","WSH"],[84,"Justin Herbert","QB","LAC"],
  [85,"Jayden Reed","WR","GB"],[86,"Jordan Addison","WR","MIN"],[87,"J.K. Dobbins","RB","DEN"],
  [88,"Jakobi Meyers","WR","JAX"],[89,"Wan'Dale Robinson","WR","TEN"],[90,"RJ Harvey","RB","DEN"],
  [91,"Drake Maye","QB","NE"],[92,"Xavier Worthy","WR","KC"],[93,"Makai Lemon","WR","PHI"],
  [94,"Ricky Pearsall","WR","SF"],[95,"Quentin Johnston","WR","LAC"],[96,"Kyle Monangai","RB","CHI"],
  [97,"Khalil Shakir","WR","BUF"],[98,"Jake Ferguson","TE","DAL"],[99,"George Kittle","TE","SF"],
  [100,"Matthew Golden","WR","GB"],[101,"Blake Corum","RB","LAR"],[102,"KC Concepcion","WR","CLE"],
  [103,"Jayden Higgins","WR","HOU"],[104,"Jordan Mason","RB","MIN"],[105,"Jacory Croskey-Merritt","RB","WSH"],
  [106,"Dallas Goedert","TE","PHI"],[107,"Jonathon Brooks","RB","CAR"],[108,"Rashid Shaheed","WR","SEA"],
  [109,"Jalen Coker","WR","CAR"],[110,"Travis Kelce","TE","KC"],[111,"Mark Andrews","TE","BAL"],
  [112,"Isaiah Likely","TE","NYG"],[113,"Joe Burrow","QB","CIN"],[114,"Jaxson Dart","QB","NYG"],
  [115,"Trevor Lawrence","QB","JAX"],[116,"Dak Prescott","QB","DAL"],[117,"Bo Nix","QB","DEN"],
  [118,"Brock Purdy","QB","SF"],[119,"Matthew Stafford","QB","LAR"],[120,"Caleb Williams","QB","CHI"],
  [121,"Travis Hunter","WR","JAX"],[122,"Patrick Mahomes","QB","KC"],[123,"Aaron Jones Sr.","RB","MIN"],
  [124,"Kenny Gainwell","RB","TB"],[125,"Rachaad White","RB","WSH"],[126,"Kenyon Sadiq","TE","NYJ"],
  [127,"Dalton Kincaid","TE","BUF"],[128,"Hunter Henry","TE","NE"],[129,"Woody Marks","RB","HOU"],
  [130,"Romeo Doubs","WR","NE"],[131,"Jerry Jeudy","WR","CLE"],[132,"Kyler Murray","QB","MIN"],
  [133,"Tyler Shough","QB","NO"],[134,"Daniel Jones","QB","IND"],[135,"Jared Goff","QB","DET"],
  [136,"Zach Charbonnet","RB","SEA"],[137,"Alvin Kamara","RB","NO"],[138,"Isiah Pacheco","RB","DET"],
  [139,"Chris Rodriguez Jr.","RB","JAX"],[140,"Braelon Allen","RB","NYJ"],[141,"Tank Bigsby","RB","PHI"],
  [142,"Jalen McMillan","WR","TB"],[143,"Calvin Ridley","WR","TEN"],[144,"Denzel Boston","WR","CLE"],
  [145,"Germie Bernard","WR","PIT"],[146,"Antonio Williams","WR","WSH"],[147,"Baker Mayfield","QB","TB"],
  [148,"Malik Willis","QB","MIA"],[149,"Adonai Mitchell","WR","NYJ"],[150,"Omar Cooper Jr.","WR","NYJ"],
  [151,"Tre Tucker","WR","LV"],[152,"Mike Washington Jr.","RB","LV"],[153,"Ray Davis","RB","BUF"],
  [154,"Tyrone Tracy Jr.","RB","NYG"],[155,"Brian Robinson Jr.","RB","ATL"],[156,"Tyjae Spears","RB","TEN"],
  [157,"Terrance Ferguson","TE","LAR"],[158,"Juwan Johnson","TE","NO"],[159,"Jalen Nailor","WR","LV"],
  [160,"Rashod Bateman","WR","BAL"],[161,"Jauan Jennings","WR","MIN"],[162,"Jaylin Noel","WR","HOU"],
  [163,"Darnell Mooney","WR","NYG"],[164,"Tyler Allgeier","RB","ARI"],[165,"James Conner","RB","ARI"],
  [166,"Keaton Mitchell","RB","LAC"],
  [167,"Broncos D/ST","DST","DEN"],[168,"Texans D/ST","DST","HOU"],[169,"Rams D/ST","DST","LAR"],
  [170,"Eagles D/ST","DST","PHI"],[171,"Seahawks D/ST","DST","SEA"],[172,"Vikings D/ST","DST","MIN"],
  [173,"Lions D/ST","DST","DET"],[174,"Steelers D/ST","DST","PIT"],[175,"Ravens D/ST","DST","BAL"],
  [180,"Brandon Aubrey","K","DAL"],[181,"Cameron Dicker","K","LAC"],[182,"Jason Myers","K","SEA"],
  [183,"Harrison Mevis","K","LAR"],[184,"Ka'imi Fairbairn","K","HOU"],[185,"Eddy Pineiro","K","SF"],
  [186,"Harrison Butker","K","KC"],
].map(([rank, name, pos, team]) => ({ id: rank, rank, name, pos, team }));

const TOTAL_TEAMS = 8;
const TOTAL_ROUNDS = 15;
const STARTER_SLOTS = { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, DST: 1, K: 1 };
const BENCH_SIZE = 6;
const FLEX_ELIGIBLE = ["RB", "WR", "TE"];
const POS_COLORS = { QB: "#C0392B", RB: "#3A7D5C", WR: "#2E6E8E", TE: "#B8862B", DST: "#6B5B95", K: "#8FA396" };

function teamOnClock(pickNumber) {
  const round = Math.ceil(pickNumber / TOTAL_TEAMS);
  const posInRound = ((pickNumber - 1) % TOTAL_TEAMS) + 1;
  const team = round % 2 === 1 ? posInRound : TOTAL_TEAMS + 1 - posInRound;
  return { round, team };
}

function buildRoster(myPicks) {
  const slots = { QB: [], RB: [], WR: [], TE: [], FLEX: [], DST: [], K: [], BN: [] };
  const sorted = [...myPicks].sort((a, b) => a.pickNumber - b.pickNumber);
  for (const p of sorted) {
    const pos = p.pos;
    if (pos !== "DST" && pos !== "K" && slots[pos] && slots[pos].length < STARTER_SLOTS[pos]) {
      slots[pos].push(p);
    } else if ((pos === "DST" || pos === "K") && slots[pos].length < STARTER_SLOTS[pos]) {
      slots[pos].push(p);
    } else if (FLEX_ELIGIBLE.includes(pos) && slots.FLEX.length < STARTER_SLOTS.FLEX) {
      slots.FLEX.push(p);
    } else {
      slots.BN.push(p);
    }
  }
  return slots;
}

function neededStarterPositions(roster) {
  const needed = [];
  for (const pos of ["QB", "RB", "WR", "TE"]) {
    if (roster[pos].length < STARTER_SLOTS[pos]) needed.push(pos);
  }
  if (roster.FLEX.length < STARTER_SLOTS.FLEX) needed.push("FLEX");
  if (roster.DST.length < STARTER_SLOTS.DST) needed.push("DST");
  if (roster.K.length < STARTER_SLOTS.K) needed.push("K");
  return needed;
}

export default function App() {
  const [myTeam, setMyTeam] = useState(1);
  const [started, setStarted] = useState(false);
  
  // Persistencia local para garantizar que el avance no se pierda nunca
  const [picks, setPicks] = useState(() => {
    const savedPicks = localStorage.getItem("fantasy_putitos_picks");
    return savedPicks ? JSON.parse(savedPicks) : [];
  });

  const [posFilter, setPosFilter] = useState("ALL");
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("fantasy_putitos_picks", JSON.stringify(picks));
  }, [picks]);

  function draftPlayer(player) {
    if (draftDone) return;
    setPicks((prev) => {
      if (prev.some(p => p.playerId === player.id)) return prev;
      return [
        ...prev,
        { 
          pickNumber: prev.length + 1, 
          round: teamOnClock(prev.length + 1).round, 
          team: teamOnClock(prev.length + 1).team, 
          playerId: player.id, 
          pos: player.pos 
        },
      ];
    });
  }

  function undoLast() {
    setPicks((prev) => prev.slice(0, -1));
  }

  const draftedIds = useMemo(() => new Set(picks.map((p) => p.playerId)), [picks]);
  const available = useMemo(() => PLAYERS.filter((p) => !draftedIds.has(p.id)), [draftedIds]);

  const currentPickNumber = picks.length + 1;
  const { round: currentRound, team: currentTeamOnClock } = teamOnClock(currentPickNumber);
  const draftDone = picks.length >= TOTAL_TEAMS * TOTAL_ROUNDS;

  const myPicks = useMemo(
    () => picks.filter((p) => p.team === myTeam).map((p) => ({ ...PLAYERS.find((pl) => pl.id === p.playerId), pickNumber: p.pickNumber })),
    [picks, myTeam]
  );
  const myRoster = useMemo(() => buildRoster(myPicks), [myPicks]);
  const needed = useMemo(() => neededStarterPositions(myRoster), [myRoster]);

  const recommendations = useMemo(() => {
    const needSet = new Set(needed.flatMap((n) => (n === "FLEX" ? FLEX_ELIGIBLE : [n])));
    const pool = [...available].sort((a, b) => a.rank - b.rank);
    const forNeed = pool.filter((p) => needSet.has(p.pos));
    const bestOverall = pool.slice(0, 3);
    const picksToShow = (needed.length > 0 ? forNeed : pool).slice(0, 3);
    return picksToShow.length > 0 ? picksToShow : bestOverall;
  }, [available, needed]);

  const filteredAvailable = useMemo(() => {
    let list = available;
    if (posFilter !== "ALL") list = list.filter((p) => posFilter === "FLEX" ? FLEX_ELIGIBLE.includes(p.pos) : p.pos === posFilter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.rank - b.rank);
  }, [available, posFilter, query]);

  // Manejador de teclado para seleccionar rápidamente el primer resultado con Enter
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && filteredAvailable.length > 0) {
      draftPlayer(filteredAvailable[0]);
      setQuery("");
    }
  };

  const isMyClock = currentTeamOnClock === myTeam && !draftDone;

  if (!started) {
    return (
      <div style={styles.setupWrap}>
        <style>{FONT_IMPORT}</style>
        <div style={styles.setupCard}>
          <div style={styles.setupEyebrow}>FANTASY PUTITOS · DRAFT NIGHT</div>
          <h1 style={styles.setupTitle}>Draft Tracker</h1>
          <p style={styles.setupSub}>8 equipos · Snake · 15 rondas · PPR completo</p>

          <label style={styles.setupLabel}>¿Cuál es tu posición de draft?</label>
          <div style={styles.slotGrid}>
            {Array.from({ length: TOTAL_TEAMS }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setMyTeam(n)} style={{ ...styles.slotBtn, ...(myTeam === n ? styles.slotBtnActive : {}), }}>
                {n}
              </button>
            ))}
          </div>
          <button style={styles.startBtn} onClick={() => setStarted(true)}>
            <Radio size={18} strokeWidth={2.5} style={{ marginRight: 8 }} />
            Empezar draft interactivo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <style>{FONT_IMPORT}</style>
      <div style={styles.scoreboard}>
        <div style={styles.scoreCell}>
          <div style={styles.scoreLabel}>RONDA</div>
          <div style={styles.scoreValue}>{Math.min(currentRound, TOTAL_ROUNDS)}<span style={styles.scoreValueSmall}>/{TOTAL_ROUNDS}</span></div>
        </div>
        <div style={styles.scoreCell}>
          <div style={styles.scoreLabel}>PICK</div>
          <div style={styles.scoreValue}>{Math.min(currentPickNumber, TOTAL_TEAMS * TOTAL_ROUNDS)}<span style={styles.scoreValueSmall}>/{TOTAL_TEAMS * TOTAL_ROUNDS}</span></div>
        </div>
        <div style={{ ...styles.scoreCell, flex: 1.6 }}>
          <div style={styles.scoreLabel}>TURNO</div>
          <div style={{ ...styles.scoreValue, color: draftDone ? "#8FA396" : isMyClock ? "#D4A72C" : "#F3EFE4", fontSize: 22 }}>
            {draftDone ? "DRAFT TERMINADO" : `Equipo ${currentTeamOnClock}`}
            {isMyClock && <span style={styles.onClockTag}>TÚ</span>}
          </div>
        </div>
        <button style={styles.undoBtn} onClick={undoLast} disabled={picks.length === 0}>
          <Undo2 size={16} style={{ marginRight: 6 }} /> Deshacer último
        </button>
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.panel}>
          <div style={styles.panelHeaderRow}>
            <div style={styles.panelHeader}>
              <Users size={16} style={{ marginRight: 8, verticalAlign: -3 }} />
              Disponibles ({available.length})
            </div>
          </div>
          <div style={styles.searchRow}>
            <Search size={15} color="#8FA396" style={{ marginRight: 6, flexShrink: 0 }} />
            <input 
              placeholder="Buscar jugador (Presiona Enter para elegir)..." 
              value={query} 
              onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={handleSearchKeyDown}
              style={styles.searchInput} 
            />
          </div>
          <div style={styles.filterRow}>
            {["ALL", "QB", "RB", "WR", "TE", "FLEX", "DST", "K"].map((f) => (
              <button key={f} onClick={() => setPosFilter(f)} style={{ ...styles.filterBtn, ...(posFilter === f ? styles.filterBtnActive : {}) }}>
                {f === "ALL" ? "Todos" : f}
              </button>
            ))}
          </div>
          <div style={styles.playerList}>
            {filteredAvailable.slice(0, 60).map((p) => (
              <div key={p.id} style={styles.playerRow}>
                <div style={styles.playerRank}>{p.rank}</div>
                <div style={{ ...styles.posBadge, background: POS_COLORS[p.pos] }}>{p.pos}</div>
                <div style={styles.playerInfo}>
                  <div style={styles.playerName}>{p.name}</div>
                  <div style={styles.playerTeam}>{p.team}</div>
                </div>
                <button style={styles.draftBtn} onClick={() => draftPlayer(p)} disabled={draftDone} title="Seleccionar jugador">
                  <Check size={16} strokeWidth={3} />
                </button>
              </div>
            ))}
            {filteredAvailable.length === 0 && <div style={styles.emptyState}>Sin resultados para ese filtro.</div>}
          </div>
        </div>

        <div style={styles.rightCol}>
          <div style={styles.recCard}>
            <div style={styles.recEyebrow}>
              <Flag size={14} style={{ marginRight: 6, verticalAlign: -2 }} />
              {isMyClock ? "LLAMADA DEL COACH" : "Mejor disponible"}
            </div>
            {needed.length > 0 && <div style={styles.recNeedLine}>Te falta cubrir: {needed.join(", ")}</div>}
            {recommendations.map((p, i) => (
              <div key={p.id} style={styles.recRow}>
                <div style={styles.recRank}>{i === 0 ? "★" : p.rank}</div>
                <div style={{ ...styles.posBadge, background: POS_COLORS[p.pos] }}>{p.pos}</div>
                <div style={styles.playerInfo}>
                  <div style={styles.playerName}>{p.name}</div>
                  <div style={styles.playerTeam}>{p.team} · rank #{p.rank}</div>
                </div>
                {isMyClock && (
                  <button style={styles.draftBtnGold} onClick={() => draftPlayer(p)}>
                    <Check size={16} strokeWidth={3} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={styles.rosterCard}>
            <div style={styles.panelHeader}>
              <Trophy size={16} style={{ marginRight: 8, verticalAlign: -3 }} />
              Tu roster (Equipo {myTeam})
            </div>
            <RosterSection label="QB" items={myRoster.QB} slotCount={STARTER_SLOTS.QB} />
            <RosterSection label="RB" items={myRoster.RB} slotCount={STARTER_SLOTS.RB} />
            <RosterSection label="WR" items={myRoster.WR} slotCount={STARTER_SLOTS.WR} />
            <RosterSection label="TE" items={myRoster.TE} slotCount={STARTER_SLOTS.TE} />
            <RosterSection label="FLEX" items={myRoster.FLEX} slotCount={STARTER_SLOTS.FLEX} />
            <RosterSection label="D/ST" items={myRoster.DST} slotCount={STARTER_SLOTS.DST} />
            <RosterSection label="K" items={myRoster.K} slotCount={STARTER_SLOTS.K} />
            <RosterSection label="BN" items={myRoster.BN} slotCount={BENCH_SIZE} bench />
          </div>
        </div>
      </div>
    </div>
  );
}

function RosterSection({ label, items, slotCount, bench }) {
  const filled = items.length;
  return (
    <div style={styles.rosterSection}>
      <div style={styles.rosterSectionLabel}>
        {label} <span style={styles.rosterCount}>{filled}/{slotCount}</span>
      </div>
      <div style={styles.rosterSlots}>
        {Array.from({ length: Math.max(slotCount, bench ? filled : slotCount) }, (_, i) => {
          const p = items[i];
          return (
            <div key={i} style={{ ...styles.rosterSlot, ...(p ? {} : styles.rosterSlotEmpty) }}>
              {p ? (
                <>
                  <span style={{ ...styles.posBadgeMini, background: POS_COLORS[p.pos] }}>{p.pos}</span>
                  {p.name}
                </>
              ) : (
                "— vacío —"
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@500;700&display=swap');`;

const styles = {
  app: { fontFamily: "'Inter', sans-serif", background: "#0F241C", minHeight: "100%", color: "#F3EFE4", padding: 16, boxSizing: "border-box" },
  setupWrap: { fontFamily: "'Inter', sans-serif", background: "#0F241C", minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box" },
  setupCard: { background: "#173428", border: "1px solid #2A5240", borderRadius: 14, padding: "32px 28px", maxWidth: 380, width: "100%", textAlign: "center" },
  setupEyebrow: { fontFamily: "'Roboto Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#D4A72C", marginBottom: 10 },
  setupTitle: { fontFamily: "'Anton', sans-serif", fontSize: 42, letterSpacing: 1, margin: "0 0 6px 0" },
  setupSub: { color: "#8FA396", fontSize: 14, margin: "0 0 24px 0" },
  setupLabel: { display: "block", fontSize: 13, color: "#C7D3CB", marginBottom: 10 },
  slotGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 },
  slotBtn: { background: "#0F241C", borderWidth: "1px", borderStyle: "solid", borderColor: "#2A5240", color: "#F3EFE4", borderRadius: 8, padding: "12px 0", fontFamily: "'Roboto Mono', monospace", fontSize: 16, fontWeight: 700, cursor: "pointer" },
  slotBtnActive: { background: "#D4A72C", color: "#0F241C", borderColor: "#D4A72C" },
  startBtn: { width: "100%", background: "#C0392B", color: "#F3EFE4", border: "none", borderRadius: 8, padding: "14px 0", fontSize: 15, fontWeight: 700, letterSpacing: 0.5, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  scoreboard: { display: "flex", alignItems: "center", gap: 20, background: "#173428", border: "1px solid #2A5240", borderRadius: 12, padding: "14px 18px", marginBottom: 16, flexWrap: "wrap" },
  scoreCell: { minWidth: 70 },
  scoreLabel: { fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: 1.5, color: "#8FA396", marginBottom: 2 },
  scoreValue: { fontFamily: "'Anton', sans-serif", fontSize: 28, lineHeight: 1 },
  scoreValueSmall: { fontSize: 15, color: "#8FA396" },
  onClockTag: { marginLeft: 10, background: "#D4A72C", color: "#0F241C", fontFamily: "'Roboto Mono', monospace", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, verticalAlign: 2 },
  undoBtn: { marginLeft: "auto", background: "transparent", border: "1px solid #2A5240", color: "#C7D3CB", borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center" },
  mainGrid: { display: "grid", gridTemplateColumns: "minmax(280px, 1.3fr) minmax(260px, 1fr)", gap: 16 },
  panel: { background: "#173428", border: "1px solid #2A5240", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", minHeight: 480 },
  panelHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  panelHeader: { fontFamily: "'Roboto Mono', monospace", fontSize: 13, letterSpacing: 1, color: "#F3EFE4", marginBottom: 12, fontWeight: 700 },
  searchRow: { display: "flex", alignItems: "center", background: "#0F241C", border: "1px solid #2A5240", borderRadius: 8, padding: "8px 10px", marginBottom: 10 },
  searchInput: { background: "transparent", border: "none", outline: "none", color: "#F3EFE4", fontSize: 14, width: "100%" },
  filterRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  filterBtn: { background: "#0F241C", borderWidth: "1px", borderStyle: "solid", borderColor: "#2A5240", color: "#C7D3CB", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  filterBtnActive: { background: "#3A7D5C", color: "#F3EFE4", borderColor: "#3A7D5C" },
  playerList: { overflowY: "auto", maxHeight: 520, display: "flex", flexDirection: "column", gap: 6 },
  playerRow: { display: "flex", alignItems: "center", gap: 10, background: "#0F241C", borderRadius: 8, padding: "8px 10px" },
  playerRank: { fontFamily: "'Roboto Mono', monospace", fontSize: 12, color: "#6B8478", width: 22, textAlign: "right" },
  posBadge: { fontSize: 10, fontWeight: 700, color: "#0F241C", borderRadius: 5, padding: "3px 6px", minWidth: 28, textAlign: "center", flexShrink: 0 },
  posBadgeMini: { fontSize: 9, fontWeight: 700, color: "#0F241C", borderRadius: 4, padding: "1px 5px", marginRight: 8 },
  playerInfo: { flex: 1, minWidth: 0 },
  playerName: { fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  playerTeam: { fontSize: 11, color: "#8FA396" },
  draftBtn: { background: "#3A7D5C", border: "none", color: "#F3EFE4", borderRadius: 6, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  draftBtnGold: { background: "#D4A72C", border: "none", color: "#0F241C", borderRadius: 6, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 },
  emptyState: { color: "#6B8478", fontSize: 13, padding: "20px 0", textAlign: "center" },
  rightCol: { display: "flex", flexDirection: "column", gap: 16 },
  recCard: { background: "#22301F", border: "1px solid #D4A72C55", borderRadius: 12, padding: 16 },
  recEyebrow: { fontFamily: "'Roboto Mono', monospace", fontSize: 12, letterSpacing: 1, color: "#D4A72C", fontWeight: 700, marginBottom: 6 },
  recNeedLine: { fontSize: 12, color: "#C7D3CB", marginBottom: 10 },
  recRow: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: "1px solid #2A5240" },
  recRank: { fontFamily: "'Anton', sans-serif", fontSize: 16, color: "#D4A72C", width: 22, textAlign: "center" },
  rosterCard: { background: "#173428", border: "1px solid #2A5240", borderRadius: 12, padding: 16, flex: 1, overflowY: "auto" },
  rosterSection: { marginBottom: 12 },
  rosterSectionLabel: { fontFamily: "'Roboto Mono', monospace", fontSize: 11, letterSpacing: 1, color: "#8FA396", marginBottom: 6 },
  rosterCount: { color: "#3A7D5C" },
  rosterSlots: { display: "flex", flexDirection: "column", gap: 4 },
  rosterSlot: { background: "#0F241C", borderRadius: 6, padding: "6px 10px", fontSize: 12.5, display: "flex", alignItems: "center" },
  rosterSlotEmpty: { color: "#4E645A", fontStyle: "italic" }
};