---
title: "Electrochemistry"
description: "A concise summary of the chapter covering electrochemical principles, cell types, Nernst equation, solution conductance, batteries, fuel cells, and corrosion, ideal for quick revision."
---

## Electrochemistry: An Overview

Electrochemistry is the study of **electricity production from spontaneous chemical reactions** and the **use of electrical energy for non-spontaneous chemical transformations**. It's crucial for theoretical and practical applications, including metal production, batteries, fuel cells, and understanding sensory signals in living organisms. This field is interdisciplinary and important for creating ecofriendly technologies.

After studying this unit, one should be able to:

- Describe an electrochemical cell and differentiate between galvanic and electrolytic cells.
- Apply the Nernst equation to calculate the electromotive force (emf) of a galvanic cell and define standard cell potential.
- Derive the relationship between standard cell potential, Gibbs energy, and equilibrium constant.
- Define resistivity, conductivity, and molar conductivity of ionic solutions.
- Differentiate between ionic (electrolytic) and electronic conductivity.
- Describe methods for measuring electrolytic solution conductivity and calculating molar conductivity.
- Justify conductivity and molar conductivity variation with concentration, and define limiting molar conductivity (Λ°m).
- Enunciate Kohlrausch law and its applications.
- Understand quantitative aspects of electrolysis.
- Describe primary and secondary batteries and fuel cells.
- Explain corrosion as an electrochemical process.

## 2.1 Electrochemical Cells

Chemical reactions can produce electrical energy, and conversely, electrical energy can drive non-spontaneous chemical reactions.

The **Daniell cell** is an example that converts chemical energy from a redox reaction into electrical energy.

- **Reaction**: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s).
- It has an electrical potential of **1.1 V** when Zn²⁺ and Cu²⁺ concentrations are unity (1 mol dm⁻³).

### Galvanic vs. Electrolytic Cells

The functioning of a Daniell cell changes based on an external potential (Eext) applied:

| Condition         | Eext < 1.1 V                             | Eext = 1.1 V                     | Eext > 1.1 V                                     |
| :---------------- | :--------------------------------------- | :------------------------------- | :----------------------------------------------- |
| Cell Type         | **Galvanic Cell** (spontaneous reaction) | **Equilibrium** (reaction stops) | **Electrolytic Cell** (non-spontaneous reaction) |
| Electron Flow     | From Zn rod to Cu rod                    | No flow                          | From Cu to Zn                                    |
| Current Flow      | From Cu to Zn                            | No flow                          | From Zn to Cu                                    |
| Anode Reaction    | Zn dissolves (oxidation)                 | No chemical reaction             | Copper dissolves                                 |
| Cathode Reaction  | Copper deposits (reduction)              | No chemical reaction             | Zinc deposits                                    |
| Energy Conversion | Chemical energy to electrical energy     | N/A                              | Electrical energy to chemical energy             |

- A **galvanic cell** (or voltaic cell) is an electrochemical cell that converts the chemical energy of a **spontaneous redox reaction** into electrical energy.
- An **electrolytic cell** uses **electrical energy to carry out non-spontaneous chemical reactions**.

### Half-Reactions and Electrodes

In the Daniell cell, the overall redox reaction is a combination of two half-reactions:

1.    **Reduction half-reaction (at Copper electrode/cathode)**: Cu²⁺(aq) + 2e⁻ → Cu(s)
2.    **Oxidation half-reaction (at Zinc electrode/anode)**: Zn(s) → Zn²⁺(aq) + 2e⁻

These are called **half-cells** or redox couples. The copper electrode is the **reduction half-cell**, and the zinc electrode is the **oxidation half-cell**.

### Components of a Galvanic Cell

- Each half-cell consists of a **metallic electrode dipped into an electrolyte**.
- The two half-cells are connected externally by a **metallic wire** through a voltmeter and switch.
- The electrolytes are connected internally through a **salt bridge** (unless both electrodes dip in the same electrolyte).

### Electrode Potential and Standard Electrode Potential

- At each electrode-electrolyte interface, a **potential difference** develops, called **electrode potential**.
- When concentrations of all species in a half-cell are unity, the electrode potential is the **standard electrode potential**.
- According to IUPAC convention, **standard reduction potentials** are called standard electrode potentials.
- In a galvanic cell:
     - The **anode** (where oxidation occurs) has a **negative potential**.
     - The **cathode** (where reduction occurs) has a **positive potential**.
- **Electrons flow from the negative electrode (anode) to the positive electrode (cathode)**; current flow is opposite to electron flow.

### Cell Potential (Electromotive Force - emf)

- The **potential difference between the two electrodes of a galvanic cell** is the **cell potential**, measured in volts.
- It is called the **cell electromotive force (emf)** when no current is drawn.
- **Convention for representation**: Anode on the left, cathode on the right.
     - A vertical line separates metal and electrolyte solution `|`.
     - A double vertical line separates two electrolytes connected by a salt bridge `||`.
- **Emf of the cell**: Ecell = Eright - Eleft.
     - Example: Cu(s)|Cu²⁺(aq)||Ag⁺(aq)|Ag(s)
          - Ecell = E°Ag⁺/Ag - E°Cu²⁺/Cu

### Standard Hydrogen Electrode (SHE)

- The potential of an individual half-cell cannot be measured directly; only the difference (emf) can be measured.
- The **Standard Hydrogen Electrode (SHE)** is assigned a **zero potential at all temperatures** and serves as a reference.
- **Reaction**: H⁺(aq) + e⁻ → ½ H₂(g).
- **Construction**: Platinum electrode coated with platinum black, dipped in acidic solution (1 M H⁺ concentration), with pure hydrogen gas bubbled through at 1 bar pressure.
- When a half-cell is combined with SHE as the anode, the measured emf equals the **standard reduction potential (E°R)** of that half-cell.
     - E°cell = E°R - E°L (where E°L for SHE is 0).
- Example:
     - Pt(s)|H₂(g, 1 bar)|H⁺(aq, 1 M)||Cu²⁺(aq, 1 M)|Cu has an emf of **0.34 V**, which is E° for Cu²⁺(aq) + 2e⁻ → Cu(s).
     - Pt(s)|H₂(g, 1 bar)|H⁺(aq, 1 M)||Zn²⁺(aq, 1 M)|Zn has an emf of **-0.76 V**, which is E° for Zn²⁺(aq) + 2e⁻ → Zn(s).
- **Interpretation of E° values**:
     - **Positive E°**: Ions are reduced more easily than H⁺ ions (e.g., Cu²⁺).
     - **Negative E°**: H⁺ ions can oxidize the metal (e.g., Zn can reduce H⁺ ions).

### Inert Electrodes

- Metals like platinum or gold can be used as **inert electrodes**.
- They **do not participate in the reaction** but provide a surface for oxidation/reduction and electron conduction.
- Examples: Hydrogen electrode [Pt(s)|H₂(g)|H⁺(aq)], Bromine electrode [Pt(s)|Br₂(aq)|Br⁻(aq)].

### Significance of Standard Electrode Potentials

- Standard electrode potentials provide information about the **relative oxidizing and reducing power** of species.
- **Higher E° (more positive)**: Stronger oxidizing agent (tendency to get reduced). Example: F₂ is the strongest oxidizing agent (E° = 2.87 V).
- **Lower E° (more negative)**: Stronger reducing agent (tendency to get oxidized). Example: Li is the most powerful reducing agent (E° = -3.05 V).
- As E° decreases (top to bottom in Table 2.1): Oxidizing power decreases, and reducing power increases.
- Electrochemical cells are used to determine pH, solubility products, equilibrium constants, and for potentiometric titrations.

## 2.3 Nernst Equation

The Nernst equation describes electrode potential and cell potential when concentrations of species are not unity.

### Electrode Potential

For an electrode reaction: Mⁿ⁺(aq) + ne⁻ → M(s)

- **Equation**: E Mⁿ⁺/M = E° Mⁿ⁺/M - (RT/nF) ln (1/[Mⁿ⁺])
     - E Mⁿ⁺/M: Electrode potential
     - E° Mⁿ⁺/M: Standard electrode potential
     - R: Gas constant (8.314 J K⁻¹ mol⁻¹)
     - T: Temperature in Kelvin
     - n: Number of electrons involved
     - F: Faraday constant (96487 C mol⁻¹)
     - [Mⁿ⁺]: Concentration of the species Mⁿ⁺

### Cell Potential

For a general electrochemical reaction: aA + bB + ne⁻ ⇌ cC + dD

- **Equation**: E(cell) = E°(cell) - (RT/nF) ln Q
     - Where Q = ([C]ᶜ[D]ᵈ)/([A]ᵃ[B]ᵇ) is the reaction quotient.
- At 298 K, this simplifies to: E(cell) = E°(cell) - (0.059/n) log Q.
- For Daniell cell: E(cell) = E°(cell) - (0.059/2) log ([Zn²⁺]/[Cu²⁺]).
     - Cell potential increases with increasing [Cu²⁺] and decreasing [Zn²⁺].

### Equilibrium Constant from Nernst Equation

- At **equilibrium**, the cell voltage E(cell) becomes **zero**, and the reaction quotient Q becomes the **equilibrium constant (Kc)**.
- **Equation**: E°(cell) = (RT/nF) ln Kc
- At 298 K: E°(cell) = (0.059/n) log Kc
- This relationship allows calculating equilibrium constants that are otherwise difficult to measure.

### Electrochemical Cell and Gibbs Energy

- The **reversible work done by a galvanic cell** equals the **decrease in its Gibbs energy**.
- **Relation**: ΔrG = -nFE(cell)
     - ΔrG: Gibbs energy of the reaction
     - E(cell): emf of the cell
     - n: Number of moles of electrons transferred
     - F: Faraday constant
- **Standard Gibbs Energy (ΔrG°)**: When concentrations of all reacting species are unity.
     - **Equation**: ΔrG° = -nFE°(cell)
- **Relation between ΔrG° and Equilibrium Constant**: ΔrG° = -RT ln K

## 2.4 Conductance of Electrolytic Solutions

### Basic Electrical Properties

- **Electrical Resistance (R)**: Measured in ohm (Ω).
     - R = ρ (l/A)
     - Directly proportional to length (l) and inversely proportional to area of cross-section (A).
- **Resistivity (ρ)**: Constant of proportionality, also known as specific resistance.
     - SI unit: ohm metre (Ω m); often used in ohm centimetre (Ω cm).
     - Resistance of a substance 1 m long with 1 m² area of cross-section.
- **Conductance (G)**: Inverse of resistance.
     - G = 1/R = κ (A/l)
     - SI unit: siemens (S), equal to ohm⁻¹ (mho).
- **Conductivity (κ)**: Inverse of resistivity, also known as specific conductance.
     - SI unit: S m⁻¹; often used in S cm⁻¹.
     - Conductance of a material 1 m long with 1 m² area of cross-section.

### Classification of Materials by Conductivity

- **Conductors**: Very large conductivity (e.g., metals, alloys like copper, silver, gold, iron, graphite, some organic polymers).
- **Insulators**: Very low conductivity (e.g., glass, ceramics, teflon).
- **Semiconductors**: Conductivity between conductors and insulators (e.g., silicon, gallium arsenide).
- **Superconductors**: Zero resistivity or infinite conductivity (metals, alloys at very low temperatures, some ceramic materials at higher temperatures).

### Types of Conductance

- **Metallic/Electronic Conductance**: Due to the movement of electrons.
     - **Depends on**:
          - Nature and structure of the metal.
          - Number of valence electrons per atom.
          - Temperature (decreases with increasing temperature).
     - Composition of the conductor remains unchanged.
- **Electrolytic/Ionic Conductance**: Due to the movement of ions present in solutions.
     - Pure water has very low conductivity due to H⁺ and OH⁻ ions.
     - Dissolving electrolytes increases conductivity.
     - **Depends on**:
          - Nature of the electrolyte.
          - Size of ions and their solvation.
          - Nature of the solvent and its viscosity.
          - Concentration of the electrolyte.
          - Temperature (increases with increasing temperature).
     - Passage of direct current can change solution composition due to electrochemical reactions.

### Measurement of Conductivity of Ionic Solutions

To measure resistance of ionic solutions:

1.    **Use an alternating current (AC) source**: Prevents change in solution composition.
2.    **Use a conductivity cell**: Specially designed vessel with two platinum electrodes coated with platinum black.
      - The resistance of the solution column between electrodes is R = ρ (l/A) = (1/κ) (l/A).

- **Cell Constant (G\*)**: `G* = l/A`.
     - Units: length⁻¹.
     - Determined by measuring resistance of a solution with known conductivity (e.g., KCl solutions).
     - `G* = R × κ`.
- **Wheatstone Bridge Setup**: Used to measure the unknown resistance of the solution.
     - When balanced, `R₂ = (R₁R₄)/R₃`.
- Once R₂ and G* are known, conductivity `κ = G*/R₂`.

### Molar Conductivity (Λm)

- **Definition**: A more meaningful quantity for comparing electrolyte conductivities.
- **Equation**: `Λm = κ/c`
     - κ: Conductivity (S m⁻¹ or S cm⁻¹).
     - c: Concentration (mol m⁻³ or mol cm⁻³).
- **Units**: S m² mol⁻¹ or S cm² mol⁻¹.
     - 1 S m² mol⁻¹ = 10⁴ S cm² mol⁻¹.
- **Physical Interpretation**: Conductance of the volume (V) of solution containing one mole of electrolyte, kept between electrodes at unit distance.
     - `Λm = κV`.

### Variation of Conductivity and Molar Conductivity with Concentration

- **Conductivity (κ)**: **Always decreases with decrease in concentration** (dilution) for both weak and strong electrolytes.
     - This is because the number of ions per unit volume carrying current decreases upon dilution.
- **Molar Conductivity (Λm)**: **Increases with decrease in concentration** (dilution).
     - The decrease in κ is more than compensated by the increase in the total volume (V) containing one mole of electrolyte.
- **Limiting Molar Conductivity (Λ°m)**: Molar conductivity when concentration approaches zero (infinite dilution).

#### Strong Electrolytes

- Λm increases **slowly** with dilution.
- **Debye-Huckel-Onsager equation**: `Λm = Λ°m - A c½`.
     - A plot of Λm vs. c½ gives a straight line.
     - Intercept: Λ°m.
     - Slope: -A (constant depending on solvent, temperature, and electrolyte type like 1-1, 2-1, etc.).

#### Kohlrausch Law of Independent Migration of Ions

- **Observation**: The difference in Λ°m for electrolytes with common ions (e.g., Λ°m(KCl) - Λ°m(NaCl)) is nearly constant.
- **Law Statement**: The **limiting molar conductivity of an electrolyte** can be represented as the **sum of the individual contributions of the anion and cation** of the electrolyte.
     - `Λ°m = n⁺ λ°⁺ + n⁻ λ°⁻`
     - n⁺, n⁻: Number of cations and anions produced on dissociation.
     - λ°⁺, λ°⁻: Limiting molar conductivities of the cation and anion, respectively.
- **Applications**:
     - Calculate Λ°m for any electrolyte from individual ion conductivities.
     - Determine dissociation constant of **weak electrolytes**.

#### Weak Electrolytes

- Λm increases **steeply** on dilution, especially at lower concentrations.
     - This is mainly due to an **increase in the degree of dissociation** (α) as dilution increases the number of ions.
- **Λ°m cannot be obtained by extrapolation** from Λm vs. c½ plot because the conductivity becomes too low to measure accurately at very low concentrations.
- **Obtained using Kohlrausch law**.
- **Degree of Dissociation (α)**: `α = Λm / Λ°m`.
- **Dissociation Constant (Kc)** for a weak electrolyte (e.g., acetic acid):
     - `Kc = (cα²) / (1 - α)`
     - Substituting α: `Kc = (c (Λm/Λ°m)²) / (1 - Λm/Λ°m)`

## 2.5 Electrolytic Cells and Electrolysis

### Electrolytic Cells

- An external voltage source is used to bring about a **non-spontaneous chemical reaction**.
- Example: Electrolysis of CuSO₄ solution with copper strips.
     - **Cathode (negative)**: Cu²⁺(aq) + 2e⁻ → Cu(s) (Copper deposited).
     - **Anode**: Cu(s) → Cu²⁺(aq) + 2e⁻ (Copper dissolved/oxidized).
- Used industrially for **purifying impure metals** (e.g., copper) and **producing metals** (e.g., Na, Mg, Al) where chemical reducing agents are unavailable.

### Faraday's Laws of Electrolysis

Michael Faraday described the quantitative aspects of electrolysis.

1.    **First Law**: The **amount of chemical reaction** occurring at any electrode is **proportional to the quantity of electricity passed** through the electrolyte.
2.    **Second Law**: The **amounts of different substances liberated by the same quantity of electricity** are **proportional to their chemical equivalent weights** (Atomic Mass ÷ Number of electrons required).

### Quantity of Electricity

- **Q = I × t** (Charge in coulombs = current in amperes × time in seconds).
- One mole of electrons (NA × 1.6021 × 10⁻¹⁹ C) carries a charge of **96487 C mol⁻¹**.
- This quantity is called a **Faraday (F)**.
     - For approximate calculations: 1 F ≈ 96500 C mol⁻¹.
- Electrode reactions require specific Faradays per mole of substance:
     - Ag⁺(aq) + e⁻ → Ag(s) : 1 F
     - Mg²⁺(l) + 2e⁻ → Mg(s) : 2 F
     - Al³⁺(l) + 3e⁻ → Al(s) : 3 F

### Products of Electrolysis

Products depend on the nature of material electrolyzed and electrode type (inert vs. reactive).

- **Inert electrodes** (Pt, Au) only act as source/sink for electrons.
- **Reactive electrodes** participate in reactions.
- Products also depend on standard electrode potentials of species present and overpotential.

**Example: Electrolysis of Aqueous NaCl Solution**

- Species present: Na⁺, Cl⁻, H⁺, OH⁻, H₂O.
- **At Cathode (reduction)**:
     - Na⁺(aq) + e⁻ → Na(s) (E° = -2.71 V)
     - H⁺(aq) + e⁻ → ½ H₂(g) (E° = 0.00 V)
     - **H⁺ reduction is preferred** (higher E°). Net reaction: H₂O(l) + e⁻ → ½H₂(g) + OH⁻(aq).
- **At Anode (oxidation)**:
     - Cl⁻(aq) → ½ Cl₂(g) + e⁻ (E° = 1.36 V)
     - 2H₂O(l) → O₂(g) + 4H⁺(aq) + 4e⁻ (E° = 1.23 V)
     - Water oxidation has a lower E°, but due to **overpotential of oxygen**, **Cl⁻ oxidation is preferred**.
- **Net reaction**: NaCl(aq) + H₂O(l) → Na⁺(aq) + OH⁻(aq) + ½H₂(g) + ½Cl₂(g).

## 2.6 Batteries

Batteries (or cells connected in series) are galvanic cells converting chemical energy to electrical energy. Ideal batteries are light, compact, and maintain constant voltage.

### Primary Batteries (Non-rechargeable)

Reactions occur once; battery becomes dead after use.

1.    **Dry Cell (Leclanche Cell)**: Used in transistors and clocks.

      - **Anode**: Zinc container. Reaction: Zn(s) → Zn²⁺ + 2e⁻.
      - **Cathode**: Carbon (graphite) rod surrounded by powdered MnO₂ and carbon. Reaction: MnO₂ + NH₄⁺ + e⁻ → MnO(OH) + NH₃.
      - **Electrolyte**: Moist paste of NH₄Cl and ZnCl₂.
      - **Potential**: Approximately **1.5 V**.
      - Ammonia forms a complex with Zn²⁺ ([Zn(NH₃)₄]²⁺).

2.    **Mercury Cell**: Suitable for low-current devices (hearing aids, watches).
      - **Anode**: Zinc-mercury amalgam. Reaction: Zn(Hg) + 2OH⁻ → ZnO(s) + H₂O + 2e⁻.
      - **Cathode**: Paste of HgO and carbon. Reaction: HgO + H₂O + 2e⁻ → Hg(l) + 2OH⁻.
      - **Electrolyte**: Paste of KOH and ZnO.
      - **Overall reaction**: Zn(Hg) + HgO(s) → ZnO(s) + Hg(l).
      - **Potential**: Approximately **1.35 V**, remains constant due to no change in ion concentration.

### Secondary Batteries (Rechargeable)

Can be recharged by passing current in the opposite direction.

1.    **Lead Storage Battery**: Common in automobiles and inverters.

      - **Anode**: Lead.
      - **Cathode**: Grid of lead packed with lead dioxide (PbO₂).
      - **Electrolyte**: 38% solution of sulphuric acid (H₂SO₄).
      - **Discharge Reactions**:
           - **Anode**: Pb(s) + SO₄²⁻(aq) → PbSO₄(s) + 2e⁻.
           - **Cathode**: PbO₂(s) + SO₄²⁻(aq) + 4H⁺(aq) + 2e⁻ → PbSO₄(s) + 2H₂O(l).
           - **Overall**: Pb(s) + PbO₂(s) + 2H₂SO₄(aq) → 2PbSO₄(s) + 2H₂O(l).
      - **Charging**: The reactions are reversed; PbSO₄ at both electrodes is converted back to Pb and PbO₂.

2.    **Nickel-Cadmium Cell**: Longer life than lead storage, but more expensive.
      - **Overall discharge reaction**: Cd(s) + 2Ni(OH)₃(s) → CdO(s) + 2Ni(OH)₂(s) + H₂O(l).

## 2.7 Fuel Cells

Galvanic cells that **continuously convert the energy of combustion of fuels** (like hydrogen, methane, methanol) directly into electrical energy.

- **Advantages over thermal plants**: Highly efficient (up to 70% vs. 40%), pollution-free.
- **Hydrogen-Oxygen Fuel Cell**: Used in Apollo space program.
     - **Reactants**: Hydrogen and oxygen gas bubbled through porous carbon electrodes.
     - **Electrolyte**: Concentrated aqueous sodium hydroxide solution.
     - **Catalysts**: Finely divided platinum or palladium incorporated into electrodes.
     - **Reactions**:
          - **Cathode**: O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq).
          - **Anode**: 2H₂(g) + 4OH⁻(aq) → 4H₂O(l) + 4e⁻.
          - **Overall**: 2H₂(g) + O₂(g) → 2H₂O(l).
     - Runs continuously as long as reactants are supplied.
     - Water produced is drinkable, making it ideal for space.

## 2.8 Corrosion

Corrosion is the **slow coating of metallic surfaces with oxides or other salts of the metal**. It causes significant damage.

- **Examples**: Rusting of iron, tarnishing of silver, green coating on copper and bronze.
- **Electrochemical Phenomenon**: A metal is oxidized by losing electrons to oxygen, forming oxides.
     - **Rusting of Iron** occurs in presence of water and air.
          - **Anodic spot (oxidation)**: Fe(s) → Fe²⁺(aq) + 2e⁻ (E° = -0.44 V).
          - **Cathodic spot (reduction)**: Electrons move to another spot where oxygen is reduced in presence of H⁺ (from dissolved CO₂ or acidic oxides).
               - O₂(g) + 4H⁺(aq) + 4e⁻ → 2H₂O(l) (E° = 1.23 V).
          - **Overall reaction**: 2Fe(s) + O₂(g) + 4H⁺(aq) → 2Fe²⁺(aq) + 2H₂O(l) (E°cell = 1.67 V).
          - **Further oxidation**: Fe²⁺ ions are further oxidized by atmospheric oxygen to ferric ions, forming hydrated ferric oxide (Fe₂O₃.xH₂O), which is rust.
- **Prevention**:
     - **Preventing contact with atmosphere**: Covering surface with paint or chemicals.
     - **Covering with other metals**: Using inert metals (Sn) or sacrificial metals (Zn).
     - **Sacrificial electrode**: Providing a more reactive metal (Mg, Zn) that corrodes itself to protect the object.

### The Hydrogen Economy

- A vision for the future where **hydrogen serves as a renewable and non-polluting energy source**, replacing fossil fuels.
- Hydrogen combustion produces only water.
- Hydrogen production would involve **splitting water using solar energy** (electrolysis), and its use in **fuel cells**. Both technologies are based on electrochemical principles.
