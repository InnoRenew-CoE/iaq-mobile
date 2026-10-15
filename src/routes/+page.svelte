<script lang="ts">
    import { selectedLanguage } from "$lib/stores/user";

    const content = {
        english: {
            title: "Air Quality Sensor",
            manualLabel: "Read the user manual here:",
            manualLink: "User manual",
            sections: [
                {
                    heading: "About",
                    text: "The About tab provides information about the project, its objectives, and how the indoor air quality sensor is used to monitor environmental conditions. Here you can learn more about the collected measurements and the purpose of the monitoring campaign.",
                },
                {
                    heading: "Home",
                    text: "The Home tab is this page. It contains useful information about your sensor and provides links to the other sections of the platform, including project information, sensor data, and the feedback form.",
                },
                {
                    heading: "Data",
                    text: "The Data tab displays measurements collected by the sensor. Interactive charts and tables allow you to explore indoor air quality data and track environmental conditions over time.",
                },
                {
                    heading: "Form",
                    text: "The Form tab allows you to provide feedback about your experience with the sensor and the platform. Your responses help us improve the project and better understand user experiences.",
                },
            ],
        },
        slovenian: {
            title: "Senzor kakovosti zraka",
            manualLabel: "Uporabniški priročnik preberite tukaj:",
            manualLink: "Uporabniški priročnik",
            sections: [
                {
                    heading: "O projektu",
                    text: "Zavihek O projektu vsebuje informacije o projektu, njegovih ciljih in o tem, kako se senzor kakovosti zraka v notranjih prostorih uporablja za spremljanje okoljskih razmer. Tu lahko izveste več o zbranih meritvah in namenu kampanje spremljanja.",
                },
                {
                    heading: "Domov",
                    text: "Zavihek Domov je ta stran. Vsebuje uporabne informacije o vašem senzorju in povezave na druge razdelke platforme, vključno z informacijami o projektu, podatki senzorja in obrazcem za povratne informacije.",
                },
                {
                    heading: "Podatki",
                    text: "Zavihek Podatki prikazuje meritve, ki jih je zbral senzor. Interaktivni grafikoni in tabele vam omogočajo pregled podatkov o kakovosti zraka v notranjih prostorih in spremljanje okoljskih razmer skozi čas.",
                },
                {
                    heading: "Obrazec",
                    text: "Zavihek Obrazec vam omogoča, da podate povratne informacije o svoji izkušnji s senzorjem in platformo. Vaši odgovori nam pomagajo izboljšati projekt in bolje razumeti izkušnje uporabnikov.",
                },
            ],
        },
    } as const;

    // undefined falls back to english
    const t = $derived(content[$selectedLanguage ?? "english"]);
</script>

<div class="px-10">
    <section class="max-w-4xl mx-auto px-6 py-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">{t.title}</h1>
        <div>
            <span>{t.manualLabel}</span>
            <a class="text-indigo-400 font-light text-sm" href="https://sensing.innorenew.eu/#resources">
                {t.manualLink}
            </a>
        </div>

        <section class="max-w-4xl mx-auto px-6 py-8">
            <div class="space-y-6">
                {#each t.sections as section}
                    <div class="border border-gray-200 rounded-xl p-6">
                        <h2 class="text-2xl font-semibold text-gray-800 mb-3">{section.heading}</h2>
                        <p class="text-gray-600 leading-relaxed">{section.text}</p>
                    </div>
                {/each}
            </div>
        </section>
    </section>
</div>
