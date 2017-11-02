/* eslint-disable */
module.exports = function renderMail(transaction) {
	return `
	<div style="margin:0;padding:0;">

		<table cellpadding="0" cellspacing="0" width="100%" border="0" align="center" style="border-collapse:collapse;background:#f6f6f6;min-width:340px;font-size:1px;line-height:normal;">
			<tbody>
				<tr>
					<td height="60">
					</td>
				</tr>
				<tr>
					<td align="center" valign="top">
						<table cellpadding="0" cellspacing="0" width="100%" align="center" style="max-width:608px;min-width:320px;border-collapse:collapse;background:#ffffff;">
							<tbody><tr>
								<td align="left" style="padding-left:5%;padding-top:3%;padding-bottom:3%;max-width:152px;">
									<a href="https://click.sender.yandex.ru/l/14391/15125/1/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://money.yandex.ru/?_openstat=mail;ad;nodeschool_lec6-8;logo;" title="Яндекс.Деньги" target="_blank" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,u7pXt9l51VcClNNlcK7-fw&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvMS9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwczovL21vbmV5LnlhbmRleC5ydS8_X29wZW5zdGF0PW1haWw7YWQ7bm9kZXNjaG9vbF9sZWM2LTg7bG9nbzs" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/1/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://money.yandex.ru/?_openstat=mail;ad;nodeschool_lec6-8;logo;" class="daria-goto-anchor" rel="noopener noreferrer">
									<img width="122" border="0" alt="Яндекс.Деньги" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Fheader__logo.png&amp;proxy=yes&amp;key=2dfbf6232884f7d523df0a4861fd741c"></a>
								</td>
							</tr>
							<tr>
								<td height="1" bgcolor="#e7e7e7">
								</td></tr>

								<tr>
									<td colspan="2">
										<table cellpadding="0" cellspacing="0" width="100%" align="center" style="border-collapse:collapse;">
											<tbody><tr>
												<td valign="top" style="padding-left:5%;padding-right:5%;color:#444444;font-family:Arial;font-size:15px;line-height:20px;">
													<h1 style="color:#444444;font-family:Arial;font-color:color;">Привет</h1>
													<p>Вы сделали ${transaction.type} операцию на сумму ${transaction.sum}</p>
													<p>${transaction.time}</p>

												</td>
											</tr>
										</tbody></table>
									</td>
								</tr>

								<tr>
									<td colspan="2" align="center" style="padding-left:5%;padding-right:5%;padding-top:5%;">
										<table cellpadding="0" cellspacing="0" width="100%" align="center" style="border-collapse:collapse;">
											<tbody><tr>
												<td valign="top" align="left">
													<span style="color:#999999;font-family:Arial;font-size:15px;">Команда Яндекс.Денег</span>
												</td>
												<td width="40%" align="right">
													<div style="color:#222222;font-family:Arial;font-size:14px;">
														<a href="https://click.sender.yandex.ru/l/14391/15125/5/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://www.facebook.com/money.yandex.ru" target="_blank" style="margin-right:2px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,-nP16xFKM_IDXiDOJ7MmSw&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvNS9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwczovL3d3dy5mYWNlYm9vay5jb20vbW9uZXkueWFuZGV4LnJ1" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/5/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://www.facebook.com/money.yandex.ru" class="daria-goto-anchor" rel="noopener noreferrer"><img style="border:none;" alt="fb" height="18" width="18" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Ffb_sm.png&amp;proxy=yes&amp;key=fef2833be2ff35037d8db76e36837b2d"></a>
														<a href="https://click.sender.yandex.ru/l/14391/15125/6/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://vk.com/yamoney" target="_blank" style="margin-right:2px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,a8D5BITS860DA9iQE7dppQ&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvNi9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwczovL3ZrLmNvbS95YW1vbmV5" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/6/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://vk.com/yamoney" class="daria-goto-anchor" rel="noopener noreferrer"><img style="border:none;" alt="vk" height="18" width="18" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Fvk_sm.png&amp;proxy=yes&amp;key=157fcd0d0e2421d773fbdcf94813addc"></a>
														<a href="https://click.sender.yandex.ru/l/14391/15125/7/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://twitter.com/yamoneynews" target="_blank" style="margin-right:2px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,gdDPjm4eAPTXdwBBSf4w1Q&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvNy9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwczovL3R3aXR0ZXIuY29tL3lhbW9uZXluZXdz" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/7/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://twitter.com/yamoneynews" class="daria-goto-anchor" rel="noopener noreferrer"><img style="border:none;" alt="tw" height="18" width="18" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Ftw_sm.png&amp;proxy=yes&amp;key=b127d6d7ccac573d4399edc35fb8825a"></a>
														<a href="https://click.sender.yandex.ru/l/14391/15125/8/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*http://www.odnoklassniki.ru/yandexmoney" target="_blank" style="margin-right:2px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,pz7ayrrL5i-cP9pHk8j3ag&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvOC9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwOi8vd3d3Lm9kbm9rbGFzc25pa2kucnUveWFuZGV4bW9uZXk" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/8/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*http://www.odnoklassniki.ru/yandexmoney" class="daria-goto-anchor" rel="noopener noreferrer"><img style="border:none;" alt="ok" height="18" width="18" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Fok_sm.png&amp;proxy=yes&amp;key=4f258bb691f39e7be8ce0516bc016429"></a>
														<a href="https://click.sender.yandex.ru/l/14391/15125/9/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*http://clubs.ya.ru/money/" target="_blank" style="margin-right:2px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,8V1YHcJNauk00P_C2PvNeg&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvOS9ML1JtbENaVTFTYUU1QmQyTXJaRkp6VmtwVFFXZFBNbU0zVURGa05sZFJVamxZYTNOR1pEQktXV05uUFQwNk1UQTNORG93LypodHRwOi8vY2x1YnMueWEucnUvbW9uZXkv" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/9/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*http://clubs.ya.ru/money/" class="daria-goto-anchor" rel="noopener noreferrer"><img style="border:none;" alt="ya" height="18" width="20" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Fya_sm.png&amp;proxy=yes&amp;key=fb896236bd79ae5568237dc853a50dec"></a>
														<a href="https://click.sender.yandex.ru/l/14391/15125/10/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://instagram.com/yandexmoney/" target="_blank" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,koxBuqcJJaRhmFyVBTs8bg&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvMTAvTC9SbWxDWlUxU2FFNUJkMk1yWkZKelZrcFRRV2RQTW1NM1VERmtObGRSVWpsWWEzTkdaREJLV1dOblBUMDZNVEEzTkRvdy8qaHR0cHM6Ly9pbnN0YWdyYW0uY29tL3lhbmRleG1vbmV5Lw" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/10/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://instagram.com/yandexmoney/" class="daria-goto-anchor" rel="noopener noreferrer"><img width="18" height="18" style="border:0;" alt="it" src="https://resize.yandex.net/mailservice?url=https%3A%2F%2Fmoney.yandex.ru%2Fi%2Fhtml-letters%2Fsocial-networks__icon_name_it.png&amp;proxy=yes&amp;key=e0521ffca64edd10319985072ebfaa4b"></a>
													</div>
													<div style="line-height:20px;">&nbsp;</div>
												</td>
											</tr>
										</tbody></table>
									</td>
								</tr>
							</tbody></table>
						</td>
					</tr>

					<tr>
						<td align="center">

							<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;max-width:608px;min-width:380px;">
								<tbody><tr>
									<td width="100%" style="padding-left:5%;padding-right:5%;padding-top:3%;padding-bottom:3%;">

										<table cellpadding="0" cellspacing="0" width="100%" style="display:inline-table;">
											<tbody><tr>
												<td valign="top">
													<table border="0" cellpadding="0" cellspacing="0" width="100%">
														<tbody><tr>
															<td align="left" width="100%" valign="top">
																<div style="color:#222222;font-family:Arial;font-size:13px;line-height:18px;display:inline-block;padding-right:20%;">
																	<a href="https://click.sender.yandex.ru/l/14391/15125/11/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://m.money.yandex.ru/?_openstat=mail;ad;lec6-8;mportal;" target="_blank" style="color:#666699;text-decoration:none;line-height:30px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,Ij0GaAN4GaSt76Tbb9sL9g&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvMTEvTC9SbWxDWlUxU2FFNUJkMk1yWkZKelZrcFRRV2RQTW1NM1VERmtObGRSVWpsWWEzTkdaREJLV1dOblBUMDZNVEEzTkRvdy8qaHR0cHM6Ly9tLm1vbmV5LnlhbmRleC5ydS8_X29wZW5zdGF0PW1haWw7YWQ7bGVjNi04O21wb3J0YWw7" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/11/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://m.money.yandex.ru/?_openstat=mail;ad;lec6-8;mportal;" class="daria-goto-anchor" rel="noopener noreferrer">Мобильная&nbsp;версия</a>
																</div>

																<div style="color:#222222;font-family:Arial;font-size:13px;line-height:18px;display:inline-block;">
																	<a href="https://click.sender.yandex.ru/l/14391/15125/12/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://money.yandex.ru/apps?_openstat=mail;ad;lec6-8;mapps;" target="_blank" style="color:#666699;text-decoration:none;line-height:30px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,zbF40LgknwypwfyPdgHmyw&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvMTIvTC9SbWxDWlUxU2FFNUJkMk1yWkZKelZrcFRRV2RQTW1NM1VERmtObGRSVWpsWWEzTkdaREJLV1dOblBUMDZNVEEzTkRvdy8qaHR0cHM6Ly9tb25leS55YW5kZXgucnUvYXBwcz9fb3BlbnN0YXQ9bWFpbDthZDtsZWM2LTg7bWFwcHM7" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/12/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://money.yandex.ru/apps?_openstat=mail;ad;lec6-8;mapps;" class="daria-goto-anchor" rel="noopener noreferrer">Приложения</a>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>

												<td valign="top">
													<table border="0" cellpadding="0" cellspacing="0" width="100%">
														<tbody><tr>
															<td align="right" width="100%" valign="top">
																<div style="color:#222222;font-family:Arial;font-size:13px;line-height:18px;display:inline-block;">
																	<a href="https://click.sender.yandex.ru/l/14391/15125/13/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://yandex.ru/support/money/issue/resolve.xml?_openstat=mail;ad;lec6-8;help;" target="_blank" style="color:#666699;text-decoration:none;line-height:30px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,jwdoexc3IzYrHy7vDB-jNQ&amp;l=aHR0cHM6Ly9jbGljay5zZW5kZXIueWFuZGV4LnJ1L2wvMTQzOTEvMTUxMjUvMTMvTC9SbWxDWlUxU2FFNUJkMk1yWkZKelZrcFRRV2RQTW1NM1VERmtObGRSVWpsWWEzTkdaREJLV1dOblBUMDZNVEEzTkRvdy8qaHR0cHM6Ly95YW5kZXgucnUvc3VwcG9ydC9tb25leS9pc3N1ZS9yZXNvbHZlLnhtbD9fb3BlbnN0YXQ9bWFpbDthZDtsZWM2LTg7aGVscDs" data-orig-href="https://click.sender.yandex.ru/l/14391/15125/13/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow/*https://yandex.ru/support/money/issue/resolve.xml?_openstat=mail;ad;lec6-8;help;" class="daria-goto-anchor" rel="noopener noreferrer">Помощь</a>
																</div>

																<div style="color:#222222;font-family:Arial;font-size:13px;line-height:18px;display:inline-block;padding-left:20%;">
																	<a align="right" href="https://unsubscribe.yandex.ru/unsubscribe/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow" target="_blank" style="color:#666699;text-decoration:none;line-height:30px;" data-vdir-href="https://mail.yandex.ru/re.jsx?uid=470480209&amp;c=LIZA&amp;cv=13.4.2402&amp;mid=163818436445601808&amp;h=a,V7U2kjrUrEYqe5EoAOR5oA&amp;l=aHR0cHM6Ly91bnN1YnNjcmliZS55YW5kZXgucnUvdW5zdWJzY3JpYmUvTC9SbWxDWlUxU2FFNUJkMk1yWkZKelZrcFRRV2RQTW1NM1VERmtObGRSVWpsWWEzTkdaREJLV1dOblBUMDZNVEEzTkRvdw" data-orig-href="https://unsubscribe.yandex.ru/unsubscribe/L/RmlCZU1SaE5Bd2MrZFJzVkpTQWdPMmM3UDFkNldRUjlYa3NGZDBKWWNnPT06MTA3NDow" class="daria-goto-anchor" rel="noopener noreferrer">Отключить&nbsp;рассылку</a>
																</div>
															</td>
														</tr>
													</tbody></table>
												</td>
											</tr>
										</tbody></table>
									</td>
								</tr>
							</tbody></table>

						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div style="line-height:20px;"> </div>
						</td>
					</tr>
					<tr>
						<td height="60">
						</td></tr>
					</tbody>
				</table>
			</td>
		</tr>
	</body>
	</table>
	</div>

	`
}
