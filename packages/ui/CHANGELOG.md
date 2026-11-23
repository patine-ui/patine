# Changelog

## [0.4.5](https://github.com/patine-ui/patine/compare/v0.4.4...v0.4.5) (2026-11-23)


### 🐛 Bug Fixes

* harden the MCP server, release and CI ([#26](https://github.com/patine-ui/patine/issues/26)) ([523b11f](https://github.com/patine-ui/patine/commit/523b11fc259ca60ac3b63c090b5cc344b45272e8))

## [0.4.4](https://github.com/patine-ui/patine/compare/v0.4.3...v0.4.4) (2026-11-23)


### 🐛 Bug Fixes

* issues from a real RTL web app migration ([#24](https://github.com/patine-ui/patine/issues/24)) ([2e32c5e](https://github.com/patine-ui/patine/commit/2e32c5eab36bdf299d3ad32a0c8f1551a0efe46a))

## [0.4.3](https://github.com/patine-ui/patine/compare/v0.4.2...v0.4.3) (2026-11-22)


### 🐛 Bug Fixes

* drags follow the pointer inside a zoomed web view ([#22](https://github.com/patine-ui/patine/issues/22)) ([16cf74c](https://github.com/patine-ui/patine/commit/16cf74c0f7ef3095260c43ad101bf60762dd6c77))

## [0.4.2](https://github.com/patine-ui/patine/compare/v0.4.1...v0.4.2) (2026-11-22)


### 🐛 Bug Fixes

* **mcp:** point Pro imports at components/patine/&lt;item&gt; ([#18](https://github.com/patine-ui/patine/issues/18)) ([b2ae304](https://github.com/patine-ui/patine/commit/b2ae30491ee7761eed331b0e4bd580c1ccbab66c))

## [0.4.1](https://github.com/patine-ui/patine/compare/v0.4.0...v0.4.1) (2026-11-22)


### 🐛 Bug Fixes

* **packaging:** publish @patine-ui/icons and @patine-ui/mcp with every release ([5db0f3f](https://github.com/patine-ui/patine/commit/5db0f3f10b8eb8e1c0f0e2543b17fdbbe4db3e21))
* **packaging:** publish @patine-ui/icons and @patine-ui/mcp with every release ([d33ee5e](https://github.com/patine-ui/patine/commit/d33ee5e7428c0ba65c2b1e6f428ce5afaf8ac4b4))

## [0.4.0](https://github.com/patine-ui/patine/compare/v0.3.0...v0.4.0) (2026-11-21)


### ✨ Features

* brand tabs fill their track, touch tint reaches the frame, Popover showCloseButton ([ea7ce94](https://github.com/patine-ui/patine/commit/ea7ce9422f1a928c44de21aae93e6d408e5e0232))
* **popover:** showCloseButton for the sheet presentation ([92129d5](https://github.com/patine-ui/patine/commit/92129d57c353f83ccd95280c6f5eb046c6b74f9d))
* **tabs:** brand tabs share the track's width ([ea4d19c](https://github.com/patine-ui/patine/commit/ea4d19c83f8b1c677c03f8f514ba0b265be20a07))


### 🐛 Bug Fixes

* **textfield:** round 28pt clear button ([ec35e48](https://github.com/patine-ui/patine/commit/ec35e48b58a8462a9411c270d26a07de2d75de36))
* **theme:** give the system scheme a server snapshot for SSR ([42fdc0d](https://github.com/patine-ui/patine/commit/42fdc0dab1caadc771d0aeee6f85372126198d04))
* **touch:** hover and press tint fill to the frame ([ec23a5f](https://github.com/patine-ui/patine/commit/ec23a5f1860d8e8ce490d2f3fa597b1838475282))

## [0.3.0](https://github.com/patine-ui/patine/compare/v0.2.0...v0.3.0) (2026-11-21)


### 🔧 API changes

* **pickers:** picker fields report through onValueChange instead of onConfirm.
* **popover,tooltip:** accessibilityLabel props are now aria-label, as on every React Native view.
* **lightbox:** ImageViewer images take src (a URL or a source) instead of source.
* **action:** accessibilityLabel props are now aria-label, as on every React Native view.
* **tabbar,tabs:** accessibilityLabel props are now aria-label, as on every React Native view.
* **breadcrumbs:** accessibilityLabel props are now aria-label, as on every React Native view.
* **textfield:** accessibilityLabel props are now aria-label, as on every React Native view.
* **select:** Select's onClear is removed; listen to onValueChange.
* **segmented:** accessibilityLabel props are now aria-label, as on every React Native view.
* **rating,slider:** accessibilityLabel props are now aria-label, as on every React Native view.
* **otp:** accessibilityLabel props are now aria-label, as on every React Native view.
* **field:** accessibilityLabel props are now aria-label, as on every React Native view.
* **progress:** accessibilityLabel props are now aria-label, as on every React Native view.
* **table:** TableColumn align is 'start' | 'center' | 'end' instead of 'left' | 'center' | 'right'.
* **qrcode,sortable:** accessibilityLabel props are now aria-label, as on every React Native view.
* **carousel:** accessibilityLabel props are now aria-label, as on every React Native view.
* **avatar:** accessibilityLabel props are now aria-label, as on every React Native view.
* **ai:** accessibilityLabel props are now aria-label, as on every React Native view.
* **button:** accessibilityLabel props are now aria-label, as on every React Native view.

### ✨ Features

* **action:** action sheets open from a trigger, with no state of yours ([98b3374](https://github.com/patine-ui/patine/commit/98b3374f1d564484088caafd70cd110bb618223b))
* **alert:** action at the alert's end, and icons in the variant color ([38a2c37](https://github.com/patine-ui/patine/commit/38a2c37d075a6731a13deb4010b92a2dc94f7e11))
* **badge:** startIcon, drawn in the label color ([551d525](https://github.com/patine-ui/patine/commit/551d5259bdf61c941a7b869a226fda5ed1046573))
* **button:** icon-sm and icon-lg, icons in the label color, a hover that shows ([101ee3a](https://github.com/patine-ui/patine/commit/101ee3a1b3af09e609f7e4ad8ad7d88c4104793e))
* **calendar:** drawn chevrons, and days that fit narrow columns ([afacfae](https://github.com/patine-ui/patine/commit/afacfae2e9dbce1c51564651c20e418f2257efe3))
* **card:** action at the header's end, as a prop or CardAction ([6d1781f](https://github.com/patine-ui/patine/commit/6d1781ff49b1c7e743df95f14d6124eed7127e41))
* content color, props-first API and component polish ([179475e](https://github.com/patine-ui/patine/commit/179475e14240378eb116542fbf4382e2435a8010))
* **core:** a drawn close mark for every close and clear button ([57882a9](https://github.com/patine-ui/patine/commit/57882a92eb6a10b344486db8de5732ee28a5a1d9))
* **core:** content color, so icons take the color of what they sit on ([c700365](https://github.com/patine-ui/patine/commit/c70036572e7d222b4e4b7a8fd59a7ff3b42c5839))
* **core:** feedbackColor on Touchable for hover and press on dark fills ([4db8da0](https://github.com/patine-ui/patine/commit/4db8da0d72a4144c334ebf53f28b305e48dc31dc))
* **core:** translatable done and OK labels ([8e20ae1](https://github.com/patine-ui/patine/commit/8e20ae134e2b2417aad7770b5e22441175c2b4bb))
* **core:** treat text split by JSX as text ([42db1a6](https://github.com/patine-ui/patine/commit/42db1a678fdaf03a8003506e1b7d55ba18ef9052))
* **dialog:** a close button, and actions that can keep it open ([9b7b3bc](https://github.com/patine-ui/patine/commit/9b7b3bccb7418b720a77206971b641105757a6d9))
* **lightbox:** images take src, like Image and Avatar ([9f578ee](https://github.com/patine-ui/patine/commit/9f578eeb3f22683035e6592882189dca25b59f4e))
* **list:** destructive rows tint their icon and drop the chevron ([f09b0f4](https://github.com/patine-ui/patine/commit/f09b0f4014ee87c66b1d6a1fc4d6d71e3cc8cec2))
* **modal:** showCloseButton, and a drawn close mark ([707d22a](https://github.com/patine-ui/patine/commit/707d22a7c71ebbada71aa6321f03706ec2a69987))
* **pagination:** drawn chevrons that follow the reading direction ([061b9bb](https://github.com/patine-ui/patine/commit/061b9bb5c2d5395fc69d53106c81a51fafdb0879))
* **pickers:** picker fields take value, defaultValue and onValueChange ([4188514](https://github.com/patine-ui/patine/commit/4188514d236406f0ca455bdbfa7d34d8869cc27d))
* **segmented:** defaultValue, and drawn chevrons on the scroll arrows ([19fd332](https://github.com/patine-ui/patine/commit/19fd3325538b4667ef36e9dbdfcd7963abe86ba8))
* **select:** clearing reports null through onValueChange ([42ff7db](https://github.com/patine-ui/patine/commit/42ff7db9632cb9ff94902ffe897a14937f759569))
* **sheet:** bottom sheet trigger, field values, hover outline and translated confirm ([9f8be3a](https://github.com/patine-ui/patine/commit/9f8be3a3aa795833eba0edcd8e64940cd8aa9953))
* **tabbar,tabs:** icons in the tab's label color ([de24f7b](https://github.com/patine-ui/patine/commit/de24f7b384117d95bfb226e28d3bf2a143004db9))
* **table:** align columns by start and end ([7eb8a8c](https://github.com/patine-ui/patine/commit/7eb8a8c1d16f5fb971686f5ebbc7594fe5a9a2a7))
* **textfield:** press anywhere in the box to focus, a hover border, a drawn clear mark ([eee76e8](https://github.com/patine-ui/patine/commit/eee76e832b2cbee728c82dc3fd4ac64115183dca))
* **toast:** onDismiss, and a drawn close mark ([725c4d8](https://github.com/patine-ui/patine/commit/725c4d8f19c390eb327eda5105a400b1c2cf8dce))


### 🐛 Bug Fixes

* **core:** track drags inside zoomed regions of a web page ([c0dfc8d](https://github.com/patine-ui/patine/commit/c0dfc8d9b78bc5a209a7581529075bd1a7a5b52c))
* **country:** phone field label offset and empty country picks ([ba5b246](https://github.com/patine-ui/patine/commit/ba5b2461e528ca1c871588ec86a42991ca4ad9d0))
* **otp:** keep the cells drawn inside a centered column ([2a8659f](https://github.com/patine-ui/patine/commit/2a8659fc24c4b17dffb8bfc28f65b75a29d011a8))
* **swipeable:** action icons and labels readable on every fill ([7413e0f](https://github.com/patine-ui/patine/commit/7413e0fb400ed167093d0cd274620d2d324fd13e))


### ♻️ Refactoring

* **ai:** aria-label on suggestion chips and the typing indicator ([f2e651a](https://github.com/patine-ui/patine/commit/f2e651a34da83aea1316d0f61aa9358904fce43d))
* **avatar:** aria-label on AvatarGroup ([a03789a](https://github.com/patine-ui/patine/commit/a03789a3ab3c375497993784446cbc1dc7082166))
* **breadcrumbs:** aria-label ([bf019cc](https://github.com/patine-ui/patine/commit/bf019ccd1944462f982a72bbf4f80e6f9407c4c8))
* **carousel:** aria-label, slide size from a style helper ([91d8107](https://github.com/patine-ui/patine/commit/91d810731f0018a1458fb1bdc4461a683c1097c9))
* **field:** aria-label on Stepper ([db6eedc](https://github.com/patine-ui/patine/commit/db6eedcc456a86538684c9953e46f849bafca426))
* **popover,tooltip:** aria-label ([c3453a2](https://github.com/patine-ui/patine/commit/c3453a2df2065f948bcd7f9f0942739d0f03e700))
* **progress:** aria-label ([9e8fe17](https://github.com/patine-ui/patine/commit/9e8fe1759ff05f59b744ee45fc16feeb10353a77))
* **qrcode,sortable:** aria-label ([5ba215d](https://github.com/patine-ui/patine/commit/5ba215df83dbb53e21d7de2b367ebf931ff0beae))
* **rating,slider:** aria-label ([ecb629a](https://github.com/patine-ui/patine/commit/ecb629acba7f5d6678efa78bdee409b912641420))

## [0.2.0](https://github.com/patine-ui/patine/compare/v0.1.0...v0.2.0) (2026-11-20)


### ✨ Features

* **list:** line inset lists up with a padded container ([7130095](https://github.com/patine-ui/patine/commit/7130095cfaa09df8cdf53986aea9bef771b8f7a3))


### 🐛 Bug Fixes

* **a11y:** a focus that follows a press shows no ring ([782253b](https://github.com/patine-ui/patine/commit/782253bd45a11ceb848049d196d461816f19782b))

## 0.1.0 (2026-11-20)


### 🔧 API changes

* **theme:** fonts by role, semibold, display and hero sizes, density
* **emoji:** DEFAULT_CATEGORY_LABELS is removed; use DEFAULT_LABELS.emoji.categories.
* **tabs:** the *Style props are replaced by styles.<slot>.
* **steps:** DEFAULT_STEP_LABELS is removed; use DEFAULT_LABELS.stepper.
* **pagination:** DEFAULT_PAGINATION_LABELS is removed; use DEFAULT_LABELS.pagination.
* **header:** the *Style props are replaced by styles.<slot>.
* **textfield:** the *Style props are replaced by styles.<slot>.
* **switch:** the *Style props are replaced by styles.<slot>.
* **radio:** the *Style props are replaced by styles.<slot>.
* **checkbox:** the *Style props are replaced by styles.<slot>.
* **progress:** the *Style props are replaced by styles.<slot>.
* **list:** the *Style props are replaced by styles.<slot>.
* **kbd:** the *Style props are replaced by styles.<slot>.
* **collapsible:** the *Style props are replaced by styles.<slot>.
* **badge:** the *Style props are replaced by styles.<slot>.
* **accordion:** the *Style props are replaced by styles.<slot>.
* **chat:** the *Style props are replaced by styles.<slot>.
* **button:** the *Style props are replaced by styles.<slot>.
* **ui:** requires React 19 and React Native 0.78 (New Architecture).
* **theme:** use design="native" for each platform's own look.
* **overlays:** BottomSheet, ActionSheet and every picker sheet take open and onOpenChange instead of visible and onClose. Select, DropdownMenu and every picker field take open, defaultOpen and onOpenChange instead of onOpen and onClose.

### ✨ Features

* **accordion:** add Accordion, AccordionContent, AccordionItem and AccordionTrigger ([7a4b34c](https://github.com/patine-ui/patine/commit/7a4b34c1909c0594067eee30769ff09ec5053d58))
* **action:** add action ([cfe5693](https://github.com/patine-ui/patine/commit/cfe5693b7277041f7125dedfd70850d091d951c8))
* **action:** add ActionSheet and DropdownMenu ([fcf18eb](https://github.com/patine-ui/patine/commit/fcf18ebc4f2fe69915477890daab541a507581ab))
* **action:** compact dropdown menu rows with a mouse or trackpad ([6068785](https://github.com/patine-ui/patine/commit/6068785fd5d8f189c9faf6ef30587bdad11a2b9b))
* **alert:** add Alert ([f647760](https://github.com/patine-ui/patine/commit/f647760912a9ead7c0a0ceb22ae13d342cd8948b))
* **animation:** add useCycle, a value looping 0 to 1 at an even pace ([134ccc8](https://github.com/patine-ui/patine/commit/134ccc8f7aa262e3901d5c1446662545c1d2af28))
* **avatar:** add Avatar ([89b6797](https://github.com/patine-ui/patine/commit/89b6797032cfec6600d015d8ecd416fd58365257))
* **avatar:** add AvatarGroup ([f349fdb](https://github.com/patine-ui/patine/commit/f349fdb02fa5522799e7f3e793eb187f2ab12c1a))
* **badge:** add Badge ([517a089](https://github.com/patine-ui/patine/commit/517a089df611686a977ac29fedf91a1d96ff2f85))
* **breadcrumbs:** add Breadcrumbs ([c8702bc](https://github.com/patine-ui/patine/commit/c8702bc1108f29e948187963a9326d1cdb0b232c))
* **breadcrumbs:** href on crumbs, a crumb without onPress is plain text ([64762a8](https://github.com/patine-ui/patine/commit/64762a86449d08d9a197526b306ae103db3cca43))
* **button:** add Button ([c8645ef](https://github.com/patine-ui/patine/commit/c8645efb296d674070a0cb4d3d474000ebc64862))
* **button:** add ButtonGroup, CopyButton, Fab and 3 more ([9eb878a](https://github.com/patine-ui/patine/commit/9eb878a59519606340b7e3f3f7608d6fc7e8066b))
* **button:** href and external, styles slots, built on Touchable ([ee4ff49](https://github.com/patine-ui/patine/commit/ee4ff496bbacba77ffdd064328a18f4b614b81b6))
* **button:** lift filled and outlined buttons with the design's shadow ([5cf1112](https://github.com/patine-ui/patine/commit/5cf1112b75376c6bc3c381ffbdd00fcf0238d2b1))
* **calendar:** add Calendar, ExpandableCalendar and WeekStrip ([91fd450](https://github.com/patine-ui/patine/commit/91fd4506dce6581142d8be33fe3340d53c3c9250))
* **card:** add Card ([1c96261](https://github.com/patine-ui/patine/commit/1c962610ccc3846ce6cd3cca7c28c03176112287))
* **card:** href makes a card a link, use the core primitives and theme ([e15b9a5](https://github.com/patine-ui/patine/commit/e15b9a53d2b513fd8dd549d32fabaff009870c7e))
* **carousel:** add Carousel and Pager ([4ab43f3](https://github.com/patine-ui/patine/commit/4ab43f332a60d347c602595946ffbbda28e09d6a))
* **chat:** add Chat and ChatComposer ([43c314e](https://github.com/patine-ui/patine/commit/43c314e23a66c9abb19b839b5d6d475790385b60))
* **checkbox, switch:** add controlPosition, deprecate controlAtEnd and controlAtStart ([ef3dfc3](https://github.com/patine-ui/patine/commit/ef3dfc32f6f75b780caaf73d1d45170d23fd5dc2))
* **checkbox:** add Checkbox ([1084d8c](https://github.com/patine-ui/patine/commit/1084d8cd7d0ba7158761e8fff9898155f92b366b))
* **checkbox:** add CheckboxGroup ([c1cdfe2](https://github.com/patine-ui/patine/commit/c1cdfe20f8fe0f291f3346aa04c00ea0805dd248))
* **collapsible:** add Collapsible ([de2e4e8](https://github.com/patine-ui/patine/commit/de2e4e8412f143926cedbbf942e41176c2ab1352))
* **color:** add ColorPicker and ColorPickerField ([94ac48c](https://github.com/patine-ui/patine/commit/94ac48cedbbd3dce7b08b4bf69f112120dd85001))
* **color:** add ColorPickerSheet ([71ea57e](https://github.com/patine-ui/patine/commit/71ea57e58e464cc7cf85154b573e11dcc188dc48))
* **core:** a Span primitive that inherits its parent Text's style ([ff36f41](https://github.com/patine-ui/patine/commit/ff36f416b21ef9427ac66317b69a73b332226399))
* **core:** accept 'native' in a component's design prop and export the theme hooks ([76a9ec0](https://github.com/patine-ui/patine/commit/76a9ec0549a73865ee4b6dc614562cf16104bdcb))
* **core:** add named animations that respect reduce motion ([e69bbfe](https://github.com/patine-ui/patine/commit/e69bbfeb723e6bca7419374c57573550d62bc6a0))
* **core:** add shared constants, types and styles ([e2e7cf7](https://github.com/patine-ui/patine/commit/e2e7cf70d5b3d71ce4238e70b980a8ae31cdad66))
* **core:** add shared hooks for state, focus, drag and swipe ([67fa370](https://github.com/patine-ui/patine/commit/67fa37079c0e52baf80dd4c64d38b561947e40f8))
* **core:** add shared primitives ([b741c33](https://github.com/patine-ui/patine/commit/b741c33bd365c6784cf00a517c67e0bcd60c23da))
* **core:** add the primitives layer and common styles ([18052bb](https://github.com/patine-ui/patine/commit/18052bb9e0a6172a7d9115ee55a001f6324b6ba9))
* **core:** add the theme, design maps and PatineProvider ([efcf8f4](https://github.com/patine-ui/patine/commit/efcf8f4f3f0faa83c090f073bf0c0d9c359af6c9))
* **core:** add ThemeProvider ([86beddb](https://github.com/patine-ui/patine/commit/86beddbe522b0e20166f5d22fb66b24ae7f329e5))
* **core:** add useDrag and useSwipe ([d6a9abd](https://github.com/patine-ui/patine/commit/d6a9abda3fa6e2639e6775d1a62d84d3e0b44d10))
* **core:** add useFocusVisible, useScrollLock and useTouchFeedback ([c8ae6c6](https://github.com/patine-ui/patine/commit/c8ae6c60eb1ac425928f4b0970856d82f53dd6ef))
* **core:** add usePop ([aeab5d3](https://github.com/patine-ui/patine/commit/aeab5d32b3224e1181096f8079d1be38f4dacb77))
* **core:** add useReturnFocus and useTrackPan ([1d7047b](https://github.com/patine-ui/patine/commit/1d7047b7e501950335d4d06204b8fc7f72249302))
* **core:** hover={false} on Touchable drops the hover tint ([43f39d5](https://github.com/patine-ui/patine/commit/43f39d589db99d1d03c3cdb0e81de691b988f98b))
* **country:** add country ([475ed30](https://github.com/patine-ui/patine/commit/475ed30576afb8990a976f5848ce9fd5ec7e7a8d))
* **country:** add CountryPicker and PhoneField ([f65c347](https://github.com/patine-ui/patine/commit/f65c3471ae4a50935ef9d0b548535bcfe6976cc3))
* **date:** add DatePicker and DatePickerField ([a92a472](https://github.com/patine-ui/patine/commit/a92a472f33675184fc28d6e0c4503d2caba710d7))
* **date:** add DatePickerSheet ([4c23820](https://github.com/patine-ui/patine/commit/4c238205eeb121dfbf9290c0e0d88fd5cbd400f4))
* **date:** add DateWheelPicker ([57b618c](https://github.com/patine-ui/patine/commit/57b618c5ebd649fe5627df3b90e1bd23b43c11e6))
* **datetime:** add DateTimePicker ([0321eeb](https://github.com/patine-ui/patine/commit/0321eeb9d1df8e43c6dfbb709030796031149140))
* **datetime:** add DateTimePickerField ([226d019](https://github.com/patine-ui/patine/commit/226d0192601c022f019c757d02edbd3d5907f890))
* **datetime:** add DateTimePickerSheet ([ba9b6d8](https://github.com/patine-ui/patine/commit/ba9b6d8e6e257a00006b2ed4076beb67611280a4))
* **descriptions:** add DescriptionList ([41a10ab](https://github.com/patine-ui/patine/commit/41a10ab9c5a7a0e13a3d59b027d1b7ebd8e5ff7f))
* **dialog:** add AlertDialog and Dialog ([3d39be2](https://github.com/patine-ui/patine/commit/3d39be2d93fbc0d83b7c3a442501456a3c5dff07))
* **duration:** add DurationPicker ([3adeed0](https://github.com/patine-ui/patine/commit/3adeed0f31abf8038e623759ff95e82fa68c2dd7))
* **duration:** add DurationPickerField and DurationPickerSheet ([48e1975](https://github.com/patine-ui/patine/commit/48e1975fa95150bb924e6140a448e58dd2853a7f))
* **emoji:** add EmojiPicker ([90a40ff](https://github.com/patine-ui/patine/commit/90a40fff42d711e3e11ad3f7b5d9f3ed129dad8b))
* **emoji:** add EmojiPickerField ([eeceb41](https://github.com/patine-ui/patine/commit/eeceb41bf995c8f3055fce4f9f37f0218cd53a58))
* **emoji:** add EmojiPickerSheet ([368bfc5](https://github.com/patine-ui/patine/commit/368bfc57dae8b849989ba501a6ac01c03acd1e05))
* **empty:** add EmptyState ([5cbca84](https://github.com/patine-ui/patine/commit/5cbca8440e6201399c114c7b95262abb99050f8a))
* **field:** add NumberField and Stepper ([327254b](https://github.com/patine-ui/patine/commit/327254bde3bffef8359815d862a4605fe381546a))
* **header:** add Header ([e622b5d](https://github.com/patine-ui/patine/commit/e622b5da3d4b154be3b076172d699078ecabf941))
* **header:** render as a header landmark, styles.title ([9ad005c](https://github.com/patine-ui/patine/commit/9ad005c526cb1aa54322526cbc0cdbc9956b8cd4))
* **image:** add Image, with a placeholder, a fade in and a fallback ([771757c](https://github.com/patine-ui/patine/commit/771757c8dc5baaff5d4d4f176011c6eaaed80058))
* **kbd:** add Kbd ([ebe0a71](https://github.com/patine-ui/patine/commit/ebe0a71ddc0f1486c3c978f1fb168baeb6f597f7))
* **language:** add LanguagePicker ([c07a0fd](https://github.com/patine-ui/patine/commit/c07a0fd32adf6603aa27fab042ba844b63d26887))
* **layout:** add AspectRatio, Box, Center and 3 more ([1e43ec2](https://github.com/patine-ui/patine/commit/1e43ec29883cacbb86c573087fc4bd582814f2f2))
* **layout:** add direction and wrap to Box ([6a5ac8d](https://github.com/patine-ui/patine/commit/6a5ac8d53cdb04b5716f648b4e50dcc75ebbd703))
* **lightbox:** add ImageViewer ([0d4ac45](https://github.com/patine-ui/patine/commit/0d4ac45ddc4b2a0b10750b5ba19633cd9ed4a5c8))
* **list:** add List ([8a57f1a](https://github.com/patine-ui/patine/commit/8a57f1a8c379e84261e3ba1cac0c4f62b0e864df))
* **list:** href on rows, styles.content and styles.title ([274d21c](https://github.com/patine-ui/patine/commit/274d21c577fb04c1eb78b54a223cf9d5b9e9600a))
* **modal:** add Drawer and Modal ([340b93c](https://github.com/patine-ui/patine/commit/340b93cc7d4aac376bff53cde6a1459d384625b2))
* **month:** add MonthPicker ([d6f4e3b](https://github.com/patine-ui/patine/commit/d6f4e3b89e2d10ce32e97525d102aed7c2f4bd98))
* **month:** add MonthPickerField and MonthPickerSheet ([0c558d4](https://github.com/patine-ui/patine/commit/0c558d4111895c6d3382c636342ab129367cb807))
* **otp:** add InputOTP ([53c3ef3](https://github.com/patine-ui/patine/commit/53c3ef39a6ef3b72753bdca1717af6180aa45404))
* **otp:** add otp ([0f5e7a7](https://github.com/patine-ui/patine/commit/0f5e7a7f6e16cdd865861bce5983427ab398330a))
* **overlays:** open and close every overlay with open and onOpenChange ([37d3794](https://github.com/patine-ui/patine/commit/37d3794645b14c093306deae23b72f26124fe476))
* **pagination:** add Pagination ([470576c](https://github.com/patine-ui/patine/commit/470576cd8530ff5e23d2b2408b92ed8b3b7c2e93))
* **popover:** add Popover ([8372198](https://github.com/patine-ui/patine/commit/83721986cea228cadbdc87bcf08f92ba3c3b467c))
* **progress:** add Progress ([ef8f56d](https://github.com/patine-ui/patine/commit/ef8f56d54ee11f81c947cfc24b9bf73a251fa60d))
* **qrcode:** add QRCode ([3f07102](https://github.com/patine-ui/patine/commit/3f071029b460a287238031b5f3ad6ba84dd3802b))
* **radio:** add RadioGroup and RadioGroupItem ([358da42](https://github.com/patine-ui/patine/commit/358da42f78d39f8234fee647b9ee3f9b2945cba8))
* **rating:** add rating ([8792f94](https://github.com/patine-ui/patine/commit/8792f94acdcc6bb42a2fac28c523ba21bd1995e0))
* **rating:** add Rating ([f6adcec](https://github.com/patine-ui/patine/commit/f6adcec7ec1180d2c03482682a61c68806ea91e1))
* **segmented:** add ChipGroup and SegmentedControl ([02d9d65](https://github.com/patine-ui/patine/commit/02d9d65e7fd529674fcc415c557c58909a937f8a))
* **segmented:** add ChoiceList ([3df6ba1](https://github.com/patine-ui/patine/commit/3df6ba1c384e42eb84c6edd6b299235967782408))
* **segmented:** add segmented ([a993aed](https://github.com/patine-ui/patine/commit/a993aed92908818259e9dc4f8b8ddd857a777663))
* **select:** add select ([bc77094](https://github.com/patine-ui/patine/commit/bc770947133bd09da06a211010278db2b59bae43))
* **select:** add Select and SelectList ([3f1c8c1](https://github.com/patine-ui/patine/commit/3f1c8c187d4a0ed05140dbbd2379c700278f1021))
* **select:** keep the value uncontrolled from defaultValue ([39c0312](https://github.com/patine-ui/patine/commit/39c0312aefb48cfde70841791fce9d7584d06aed))
* **separator:** add Separator ([1426996](https://github.com/patine-ui/patine/commit/1426996dd713dd784246f96eedaca098fb688a49))
* **sheet:** add a close button to the centered modal and size against the modal's own area ([4cb0bc5](https://github.com/patine-ui/patine/commit/4cb0bc5b910d0cd918cf25913c136d27a96b402b))
* **sheet:** add BottomSheet ([b00e5a0](https://github.com/patine-ui/patine/commit/b00e5a08f28981f1a7490f6445574d78eed6d9f4))
* **sheet:** add Dropdown, PickerField and PickerSheet ([2d0e345](https://github.com/patine-ui/patine/commit/2d0e345c8a74194014af6a157dca6c0feca7d24a))
* **sheet:** add SheetContent ([ea14ae8](https://github.com/patine-ui/patine/commit/ea14ae8e586496c1e00a39ac2e2fb888f52731e9))
* **sheet:** announce BottomSheet as a modal dialog and add closeLabel ([6c2af3d](https://github.com/patine-ui/patine/commit/6c2af3d2a6b900806827c2fb4aecdb45ccb482f7))
* **signature:** add SignaturePad ([51840de](https://github.com/patine-ui/patine/commit/51840de36dd77baa1d0361a3236ec07c448b2de7))
* **skeleton:** add Skeleton ([ede208f](https://github.com/patine-ui/patine/commit/ede208f5eeaf58e818f46da94f7a55c67ce8f98f))
* **slider:** add slider ([af5dd40](https://github.com/patine-ui/patine/commit/af5dd401adcb4563e862c2cb78e0e83cb6815d52))
* **slider:** add Slider ([cf3e933](https://github.com/patine-ui/patine/commit/cf3e9335e858e7e807627e20dc970f62e86650a9))
* **sortable:** add SortableList ([f304b7a](https://github.com/patine-ui/patine/commit/f304b7a53121fb48b5833151b831ce2f9d4f2ee6))
* **stack:** add Stack ([dcbdd9d](https://github.com/patine-ui/patine/commit/dcbdd9d5cdb5e01a8b22e876d25cf98b2be537c9))
* **stat:** add Stat ([f32104a](https://github.com/patine-ui/patine/commit/f32104a571f53f9d6a114e3725d170900519dfa5))
* **steps:** add Steps ([c402fe0](https://github.com/patine-ui/patine/commit/c402fe05b73c3d7b65119376d7b5863e410a8409))
* **suggestions:** add SuggestionChips for quick replies ([8dae632](https://github.com/patine-ui/patine/commit/8dae632479529cd329def31a4d75b1e2dbfef389))
* **swipeable:** add SwipeableRow ([087d58b](https://github.com/patine-ui/patine/commit/087d58b78c3728274017ee7589a6155ea78506fd))
* **switch:** add Switch ([0abc02d](https://github.com/patine-ui/patine/commit/0abc02d5e36c612b53210d16601651cb4b9cdc16))
* **switch:** loading state, thumb slides the right way in right to left ([59701e0](https://github.com/patine-ui/patine/commit/59701e0a6f0a56013a81942f358d050cd03dbd55))
* **tabbar:** add BottomTabBar and NavigationRail ([8056c29](https://github.com/patine-ui/patine/commit/8056c29dc3d2e8a2362ced7108a59792d1fc85e5))
* **tabbar:** render as nav, href on items ([3f2da83](https://github.com/patine-ui/patine/commit/3f2da83a279ed9f4c54b141e4582e40e7d799dae))
* **table:** add Table ([884ec0e](https://github.com/patine-ui/patine/commit/884ec0e01219807d81753f0a5a06d8784e698509))
* **tabs:** add Tabs, TabsContent, TabsList and TabsTrigger ([a138e59](https://github.com/patine-ui/patine/commit/a138e598d140c49132acaf08a8b6cdbd4849efed))
* **text:** add Heading and Text ([4608473](https://github.com/patine-ui/patine/commit/460847348eda0110a84818944843cae330225357))
* **textfield:** add SearchField ([ba4e4f0](https://github.com/patine-ui/patine/commit/ba4e4f0442bd0ff6acd16ad602a44dd1c0879672))
* **textfield:** add TextArea and TextField ([bc71020](https://github.com/patine-ui/patine/commit/bc71020f2b40c4467e00a4f650e963c5ab407d39))
* **theme:** fonts by role, semibold, display and hero sizes, density ([228dd2b](https://github.com/patine-ui/patine/commit/228dd2b2915cebff85c85ed85fbda34041bd4479))
* **theme:** resolve the theme once, add createStyles, ThemeScope, labels, dir and new color tokens ([329bdb3](https://github.com/patine-ui/patine/commit/329bdb31ac41c4fc7837858b8ddc87921f2ba7e5))
* **time:** add TimePicker, TimeRangePicker, TimeRangePickerField and TimeRangePickerSheet ([2b7a1a5](https://github.com/patine-ui/patine/commit/2b7a1a58174c67a56c982faa80b7e3e07bfcb9d6))
* **time:** add TimePickerField ([4a851eb](https://github.com/patine-ui/patine/commit/4a851ebe7f781f075f161a1af8aa5a8803caae23))
* **time:** add TimePickerSheet ([788e4f0](https://github.com/patine-ui/patine/commit/788e4f0e32a2d8e5c427a1a290fedd78d31d180e))
* **timezone:** add timezone ([98d8e2c](https://github.com/patine-ui/patine/commit/98d8e2ccadf984bdbdf0aae966d32131585a0312))
* **timezone:** add TimeZonePicker ([1719706](https://github.com/patine-ui/patine/commit/17197069d4838dbf6a15ab3e8d272ab1319a7325))
* **toast:** add Toaster ([3a89fa7](https://github.com/patine-ui/patine/commit/3a89fa7f2b6ea071834310a5b40d8a929f7a3a17))
* **tooltip:** add Tooltip and TooltipProvider ([d027cd8](https://github.com/patine-ui/patine/commit/d027cd81b287bf183fb534df6fb35609bc510d4c))
* **typing:** add TypingIndicator ([6cd9efa](https://github.com/patine-ui/patine/commit/6cd9efa6d7c1dec16c78511427f63154a8f25ca7))
* **wheel:** add MultiWheelPicker and WheelPicker ([61237fa](https://github.com/patine-ui/patine/commit/61237fae5ea973da76373c780431acf7f4fb9201))
* **wheel:** add wheel ([e63f90b](https://github.com/patine-ui/patine/commit/e63f90bb1e13ae4862ca5f1e814d577c6bce1a42))
* **wheel:** add WheelPickerField ([31f5f23](https://github.com/patine-ui/patine/commit/31f5f23df48fee94d6cf32bfba4c0072fcd5aa55))
* **wheel:** add WheelPickerSheet ([c7363e5](https://github.com/patine-ui/patine/commit/c7363e5622ed64771985f5e994c7f5a16385fc63))


### 🐛 Bug Fixes

* **a11y:** the focus ring follows the modality while focused ([8a31a8a](https://github.com/patine-ui/patine/commit/8a31a8aed4ce6e79f69957466d307c031dbc7495))
* **animation:** no loop when reduce motion arrives before the effect ([5b44f9a](https://github.com/patine-ui/patine/commit/5b44f9a3e46147c60a45751f032c98b4ee592a7b))
* **build:** name the animated exports' types so declarations emit ([b2522bd](https://github.com/patine-ui/patine/commit/b2522bd038092963473eab596cf470fc2fb0da20))
* **card:** draw composed parts in the Card's theme and design ([1c37aa9](https://github.com/patine-ui/patine/commit/1c37aa924725d903e7604329e3b274527b0e52c2))
* **display:** idle swipe actions aren't drawn, a list row pads its leading element ([6668fbe](https://github.com/patine-ui/patine/commit/6668fbefb89576b4abf9402e3ef0ddab4e1a1e10))
* **image:** alt reaches the img on the web ([a5832a2](https://github.com/patine-ui/patine/commit/a5832a2418582421143009becbdf7498e964cfa9))
* **popover:** the arrow takes the panel's border, tooltips measure the trigger ([32ab72f](https://github.com/patine-ui/patine/commit/32ab72f4fc59f102281be462df2682fdf91f5071))
* **rtl:** overlays and start/end styles follow the provider's dir on the web ([87f5875](https://github.com/patine-ui/patine/commit/87f58754748716748a5b7168daa02a58132e4281))
* **sortable:** stop text selection while dragging on the web ([bb22e28](https://github.com/patine-ui/patine/commit/bb22e289e5ab1bc9a0062d54282bb173a71f494d))
* **switch:** animate the Material thumb's size on the native driver ([200dd71](https://github.com/patine-ui/patine/commit/200dd7182246692f51b4b50d90ddce1a367adcf8))
* **textfield:** a caller's aria-label wins over the built one, styles.input on SearchField ([a070abf](https://github.com/patine-ui/patine/commit/a070abfdaee0378b7d59b29561430002d70bb386))
* **textfield:** shrink an auto-growing TextArea on the web when its text gets shorter ([6ef6fc5](https://github.com/patine-ui/patine/commit/6ef6fc532548ec0143dfcb79704fe1681e585530))


### ♻️ Refactoring

* **accordion:** styles.label on the trigger, use the core primitives and theme ([6042c58](https://github.com/patine-ui/patine/commit/6042c581e0025211d6170b379a27ef9663983e21))
* **badge:** styles.label, use the core primitives and theme ([0c078e3](https://github.com/patine-ui/patine/commit/0c078e3da06071c30e34d599aabeda0c8b1cd574))
* **chat:** styles.bubble and styles.text on MessageBubble, use the core primitives and theme ([95ad3f0](https://github.com/patine-ui/patine/commit/95ad3f04fcd4da107fae7da2a0e951f060c274cb))
* **checkbox:** styles.label and styles.box, use the core primitives and theme ([c7ce633](https://github.com/patine-ui/patine/commit/c7ce633ad304575e66dcdf288b140a7350aa5b12))
* **collapsible:** styles.label, use the core primitives and theme ([82c1bd3](https://github.com/patine-ui/patine/commit/82c1bd3d84afde91b75c626a8a77b6337434a9e0))
* **emoji:** labels come from the provider ([88715f7](https://github.com/patine-ui/patine/commit/88715f7c5f769b733065213d486b4004d75188f4))
* **kbd:** styles.text, use the core primitives and theme ([6c6474c](https://github.com/patine-ui/patine/commit/6c6474ca4faeec927b26df6f0e474105f425c216))
* **pagination:** labels come from the provider ([3e3eb25](https://github.com/patine-ui/patine/commit/3e3eb252e8d6403d2b3d16a0ffc8a2740d3bfbf9))
* **progress:** styles.indicator, use the core primitives and theme ([2b71d46](https://github.com/patine-ui/patine/commit/2b71d467c4ccf05c6cdcaf03e6eecddd42ea6e3f))
* **radio:** styles.label, use the core primitives and theme ([a59f652](https://github.com/patine-ui/patine/commit/a59f652d095e470fc98083e45bfb35c6c962a319))
* **steps:** labels come from the provider ([cad3cf9](https://github.com/patine-ui/patine/commit/cad3cf91ee79b0e91043535d4cc6c8c8f7a855ea))
* **switch:** styles.label, use the core primitives and theme ([417a8f6](https://github.com/patine-ui/patine/commit/417a8f647d74da745b542912aedb46cdfecf7a7e))
* **tabs:** styles.label on the trigger, use the core primitives and theme ([c33402e](https://github.com/patine-ui/patine/commit/c33402ea62b201e490140523df5044202ec4fe8b))
* **theme:** remove the 'auto' alias of design ([c6c8c02](https://github.com/patine-ui/patine/commit/c6c8c026c94ace28617fba9d3f5fefeb60ddac70))


### Build

* **ui:** require React 19 and React Native 0.78 ([79fba02](https://github.com/patine-ui/patine/commit/79fba02d6ca0cd1a25fdc684a12d9a6c96b2b03b))
